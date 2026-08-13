---
title: Deploy the Speakeasy tunnel agent on AWS
description: Deploy the Speakeasy tunnel agent into an existing AWS account on an EKS node group, an ECS Fargate task, or a Docker-on-EC2 host supervised by systemd, dialing out to the Speakeasy tunnel gateway.
guideCategory: Deployment guides
---

This guide deploys the Speakeasy tunnel agent (`gram-tunnel-agent`) into
an AWS account you already operate, onto one of three compute targets:
an existing EKS cluster's node group, an ECS Fargate task, or a Docker
container on an EC2 host, supervised by systemd. The agent dials outbound to
`wss://tunnel.speakeasy.com` and proxies to an MCP server you already
run; nothing in your network is exposed inbound.

You need an existing VPC with at least one private subnet and an
existing outbound path to the internet (a NAT Gateway or equivalent) —
this guide does not create a VPC or a NAT Gateway, and confirms the path
rather than building one. For the EKS target you need an existing
cluster and a working `kubectl` context for it; this guide does not
create a cluster. You need AWS CLI 2.x installed locally, and for the
EKS target a `kubectl` matching your cluster (recorded against `kubectl`
1.31 here). You need credentials permitted to create the compute
resource for your chosen target — an EKS Deployment and Secret; an ECS
task definition, service, and IAM roles; or an EC2 instance — and to
read or modify the security group attached to it. Finally, you need the
address of a private MCP server you already operate, reachable from
wherever the agent will run; this guide does not stand one up.

Two AWS facts hold across all three targets and are covered once, below,
before the per-target steps. Everything after that is specific to the
compute target you chose — read only that section; the three are
self-contained and do not depend on each other.

## Confirm outbound egress to the tunnel gateway

The agent dials `wss://tunnel.speakeasy.com` on TCP 443 outbound only. A
NAT gateway lets a private-subnet resource make that connection without
accepting anything unsolicited inbound — you are not exposing anything
new, you are confirming a path your VPC already has.

Check the private subnet's route table and the security group attached
to wherever the agent will run (the node/pod security group for EKS, the
`awsvpc` ENI's security group for ECS Fargate, the instance's security
group for EC2-host):

```bash
aws ec2 describe-route-tables --filters "Name=association.subnet-id,Values=<PRIVATE_SUBNET_ID>"
aws ec2 describe-security-groups --group-ids <SECURITY_GROUP_ID>
```

- `<PRIVATE_SUBNET_ID>` — the private subnet the agent will run in;
  from your existing VPC.
- `<SECURITY_GROUP_ID>` — the security group attached to wherever the
  agent runs; from your existing VPC.

**Verify**: the route table shows a `0.0.0.0/0` route to a NAT gateway
(`nat-*`) for the subnet, and the security group's outbound rules permit
TCP 443 to `0.0.0.0/0` — the VPC default security group already allows
all outbound traffic, so this is often already true — or explicitly to
the tunnel gateway's resolved range if the default has been narrowed.

If no NAT route is present, outbound to `wss://tunnel.speakeasy.com` will
fail; add a route via your existing NAT Gateway (this guide does not
create one). If outbound 443 is blocked by a narrowed security group, add
an explicit outbound rule:

```bash
aws ec2 authorize-security-group-egress \
  --group-id <SECURITY_GROUP_ID> \
  --protocol tcp --port 443 --cidr 0.0.0.0/0
```

The NAT/egress path is your existing infrastructure, confirmed here, not
created — nothing above is a resource you must size.

## Locate the reachable address of the existing MCP server

<!-- verification-exception: this step only reads/copies a value your
own MCP deployment already documents; there is no single AWS command
that confirms reachability across all three compute targets before the
agent is deployed. -->

Every target needs `TUNNEL_LOCAL_MCP_URL` set to an address reachable
from wherever the agent runs, before you deploy it. This guide never
invents that address — it is your own MCP server's own address, from
whatever inventory your MCP server's own deployment documents. The form
it takes differs by target:

- **EKS**: an in-cluster Kubernetes Service DNS name, reachable from any
  pod in the cluster including the tunnel agent's:
  `http://<MCP_SERVICE_NAME>.<NAMESPACE>.svc.cluster.local:<MCP_PORT>/mcp`.
- **ECS Fargate**: an address reachable from the task's `awsvpc` elastic
  network interface — the ENI Fargate attaches directly to the task, in
  the subnet you name in `--network-configuration`
  (see [Create the cluster and the awsvpc service](#ecs-create-service)).
  If the MCP server is itself another task or service on the same VPC,
  its address is a private DNS name or IP on that VPC:
  `http://<MCP_PRIVATE_DNS_OR_IP>:<MCP_PORT>/mcp`.
- **EC2-host**: a private DNS name or IP reachable from the instance's
  subnet: `http://<MCP_PRIVATE_DNS_OR_IP>:<MCP_PORT>/mcp`.

In every case, the security group attached to wherever the agent runs
must permit outbound traffic to the MCP server's port — confirmed by
[Confirm outbound egress to the tunnel gateway](#confirm-tunnel-egress)
if the MCP server sits behind a security group this guide already
checks, otherwise your own MCP-side security group.

## EKS node group variant

### Confirm cluster access and the node/pod security group

```bash
kubectl config current-context
kubectl get nodes
```

**Verify**: the current context names the cluster you expect, and nodes
show `Ready`:

```text
NAME                          STATUS   ROLES    AGE
ip-10-0-1-23.ec2.internal     Ready    <none>   4d
```

If the wrong context is selected, switch with
`kubectl config use-context <CONTEXT>`. If no nodes show `Ready`, that is
a cluster health issue outside this guide's scope.

The cluster is your own, per this guide's scope — nothing here is
substitutable.

### Save the manifest and apply the tunnel agent Deployment (EKS)

This creates a Secret and a one-replica Deployment in the cluster. It is
reversible — `kubectl delete -f` removes both.

The Deployment's pod inherits the node group's security group unless
your cluster uses Security Groups for Pods. In the default case, the
EKS cluster/node security group allows all traffic from itself, so
pod-to-pod traffic to an in-cluster MCP server needs no new rule. If
your MCP server's pods carry a distinct Security Groups for Pods
security group instead, add an inbound rule on that security group
permitting the tunnel agent's pod traffic on the MCP server's listening
port — this requires Nitro-based, ENI-trunking-capable instance types
and is unsupported on EKS Auto Mode or Windows nodes; treat it as a
conditional case for your own node type, not a default step.

Save the manifest to a file, then apply it:

```bash
cat > gram-tunnel.yaml <<'EOF'
apiVersion: v1
kind: Secret
metadata:
  name: gram-tunnel-key
type: Opaque
stringData:
  TUNNEL_KEY: "<YOUR_TUNNEL_KEY>"
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: gram-tunnel
spec:
  replicas: 1
  selector:
    matchLabels:
      app: gram-tunnel
  template:
    metadata:
      labels:
        app: gram-tunnel
    spec:
      containers:
        - name: tunnel-agent
          image: ghcr.io/speakeasy-api/gram-tunnel-agent:0.1.0
          env:
            - name: TUNNEL_KEY
              valueFrom:
                secretKeyRef:
                  name: gram-tunnel-key
                  key: TUNNEL_KEY
            - name: TUNNEL_LOCAL_MCP_URL
              value: "<local MCP URL>"
            - name: TUNNEL_GATEWAY_URL
              value: "wss://tunnel.speakeasy.com/connect"
            - name: TUNNEL_SERVICE_VERSION
              value: "<service version>"
EOF
kubectl apply -f gram-tunnel.yaml
```

`<YOUR_TUNNEL_KEY>`, `<local MCP URL>`, and `<service version>` — see
[Speakeasy deployment](#deploy-speakeasy-workload) for their
origin.

**Verify**: check the pod reached `Running`:

```bash
kubectl get pods -l app=gram-tunnel
```

```text
NAME                           READY   STATUS    RESTARTS   AGE
gram-tunnel-6b7f9c8d5f-abcde   1/1     Running   0          30s
```

If `STATUS` shows `CrashLoopBackOff` or `RESTARTS` is climbing, read the
container's logs:

```bash
kubectl logs -l app=gram-tunnel --tail=20
```

A malformed `TUNNEL_KEY` or `TUNNEL_LOCAL_MCP_URL` surfaces here as a
repeated connection error in the tail of the log rather than a
Kubernetes-level failure — `kubectl get pods` alone shows `Running` with
climbing `RESTARTS` but does not say why.

`STATUS` stuck in `ImagePullBackOff` means the image tag or network
egress from the node is wrong — revisit
[Confirm outbound egress to the tunnel gateway](#confirm-tunnel-egress).
`CrashLoopBackOff` with climbing `RESTARTS` means the agent itself is
failing — read the trimmed `kubectl logs` output above for its error.

The Deployment name (`gram-tunnel`), the manifest filename
(`gram-tunnel.yaml`), and the namespace are starting points, not
requirements.

## ECS Fargate variant

### Create the ECS task execution role

This creates a new IAM role. It is reversible — the role can be
deleted — but any running task using it stops working if you remove it.

```bash
cat > ecs-tasks-trust-policy.json <<'EOF'
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": { "Service": "ecs-tasks.amazonaws.com" },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
aws iam create-role \
  --role-name ecsTaskExecutionRole \
  --assume-role-policy-document file://ecs-tasks-trust-policy.json
aws iam attach-role-policy \
  --role-name ecsTaskExecutionRole \
  --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy
```

If you will store `TUNNEL_KEY` in Secrets Manager (recommended — used
below), the inline policy granting `secretsmanager:GetSecretValue`
scoped to the secret's ARN is attached in
[Grant the execution role access to the secret](#ecs-grant-secret-access)
below, once that secret's ARN exists.

**Verify**:

```bash
aws iam get-role --role-name ecsTaskExecutionRole
```

Expect the role's `AssumeRolePolicyDocument` to show
`"Service": "ecs-tasks.amazonaws.com"`.

If the role name already exists under a different trust policy,
`create-role` fails; reuse the existing role only if its trust policy
matches, otherwise pick a different name.

`ecsTaskExecutionRole` is the AWS console's own default name, not a
requirement — any name works as long as the task definition's
`--execution-role-arn` matches it.

### Create the tunnel key secret

This creates a new Secrets Manager secret holding `TUNNEL_KEY`. It is
reversible — the secret can be scheduled for deletion, though any
running task referencing it stops being able to start new tasks once it
is gone.

```bash
aws secretsmanager create-secret \
  --name gram-tunnel-key \
  --secret-string '{"TUNNEL_KEY":"<YOUR_TUNNEL_KEY>"}'
```

`<YOUR_TUNNEL_KEY>` is the K4 placeholder — never a real key. The
command's own JSON output on success matters for the next step:

```json
{
  "ARN": "arn:aws:secretsmanager:<REGION>:<ACCOUNT_ID>:secret:gram-tunnel-key-<SUFFIX>",
  "Name": "gram-tunnel-key",
  "VersionId": "<VERSION_ID>"
}
```

Secrets Manager appends a hyphen and a random six-character suffix
(`<SUFFIX>` above) to the name at the end of the ARN. **The ARN you
paste into the task definition's `valueFrom` below is this full returned
ARN, including that suffix — never an ARN hand-built from the secret
name alone**, because a hand-built ARN omits the suffix and will not
resolve.

**Verify**:

```bash
aws secretsmanager describe-secret --secret-id gram-tunnel-key
```

Expect the response to include the same full ARN (with its
six-character suffix) returned by `create-secret` above, and
`"Name": "gram-tunnel-key"`. This is also the safe way to recover the
full ARN if you did not copy it from the `create-secret` output.

If a secret with this name already exists, `create-secret` fails with
`ResourceExistsException` — reuse the existing secret's ARN (from
`describe-secret`) rather than retrying with a new name, or
delete-and-recreate if that is safe.

The secret name `gram-tunnel-key` is this guide's choice, substitutable,
as long as the task definition's `valueFrom` below is updated to match
the ARN this command actually returns.

### Grant the execution role access to the secret

This attaches an inline IAM policy to `ecsTaskExecutionRole` (created in
[Create the ECS task execution role](#ecs-create-execution-role)),
scoped to the secret ARN the previous step returned. It is reversible —
remove the inline policy with `iam delete-role-policy` — but the task
fails to start new instances without it once removed.

```bash
cat > ecs-secret-access-policy.json <<'EOF'
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "secretsmanager:GetSecretValue",
      "Resource": "<SECRET_ARN>"
    }
  ]
}
EOF
aws iam put-role-policy \
  --role-name ecsTaskExecutionRole \
  --policy-name gram-tunnel-secret-access \
  --policy-document file://ecs-secret-access-policy.json
```

`<SECRET_ARN>` — the **full ARN returned by
`aws secretsmanager create-secret`** in
[Create the tunnel key secret](#ecs-create-secret) above, including the
six-character suffix AWS appends, never an ARN hand-built from the
secret name. `kms:Decrypt` is additionally required only if the secret
uses a customer-managed KMS key rather than the account's default key —
not added here since this guide does not create a customer-managed key.

**Verify**:

```bash
aws iam get-role-policy --role-name ecsTaskExecutionRole --policy-name gram-tunnel-secret-access
```

Expect the response's `PolicyDocument` to show
`"Action": "secretsmanager:GetSecretValue"` and `"Resource"` set to the
same full secret ARN from
[Create the tunnel key secret](#ecs-create-secret).

If this policy was skipped or scoped to the wrong ARN, the task's
`secrets` reference fails at task start with an access-denied error —
re-run `describe-secret` from
[Create the tunnel key secret](#ecs-create-secret) to confirm the ARN
matches exactly, including the suffix.

The inline policy name (`gram-tunnel-secret-access`) is this guide's
choice, substitutable; the action and resource scope are the documented
requirement, not a starting point.

### Register the task definition

This registers a new ECS task definition revision. It is reversible —
registering a new revision does not delete the old one. `networkMode`
must be `awsvpc` because the task is placed on Fargate. `cpu`/`memory`
use the smallest documented Fargate combination, `256` (.25 vCPU) /
`512` MiB.

```bash
cat > tunnel-agent-task-def.json <<'EOF'
{
  "family": "gram-tunnel-agent",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "arn:aws:iam::<ACCOUNT_ID>:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "tunnel-agent",
      "image": "ghcr.io/speakeasy-api/gram-tunnel-agent:0.1.0",
      "environment": [
        { "name": "TUNNEL_LOCAL_MCP_URL", "value": "<local MCP URL>" },
        { "name": "TUNNEL_GATEWAY_URL", "value": "wss://tunnel.speakeasy.com/connect" },
        { "name": "TUNNEL_SERVICE_VERSION", "value": "<service version>" }
      ],
      "secrets": [
        {
          "name": "TUNNEL_KEY",
          "valueFrom": "<SECRET_ARN>"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/gram-tunnel-agent",
          "awslogs-region": "<REGION>",
          "awslogs-stream-prefix": "tunnel-agent"
        }
      }
    }
  ]
}
EOF
aws ecs register-task-definition --cli-input-json file://tunnel-agent-task-def.json
```

- `<ACCOUNT_ID>`, `<REGION>` — your own account and region.
- `<SECRET_ARN>` — the **full ARN returned by
  `aws secretsmanager create-secret`** in
  [Create the tunnel key secret](#ecs-create-secret) above, including
  the six-character suffix AWS appends — never an ARN hand-built from
  the secret name.
- `<local MCP URL>` and `<service version>` — see
  [Speakeasy deployment](#deploy-speakeasy-workload).

`TUNNEL_KEY` is passed via the `secrets` container-definition parameter,
backed by Secrets Manager, never via `environment` — the ECS equivalent
of the Kubernetes `secretKeyRef`.

A CloudWatch Logs log group (`/ecs/gram-tunnel-agent`) must exist before
tasks start logging to it:

```bash
aws logs create-log-group --log-group-name /ecs/gram-tunnel-agent
```

**Verify**:

```bash
aws ecs describe-task-definition --task-definition gram-tunnel-agent
```

Expect `status: ACTIVE` and the container definition to show the pinned
image tag `0.1.0`.

`ClientException: Invalid 'cpu' setting for task` means the CPU/memory
pair does not match a Fargate-documented combination. The `secrets`
reference fails at task start if the execution role lacks
`secretsmanager:GetSecretValue` on that ARN.

`256`/`512` is a starting point — the smallest Fargate-supported pair —
not a requirement. The family name `gram-tunnel-agent` and the log group
name are this guide's choice, substitutable.

### Create the cluster and the awsvpc service

This creates an ECS cluster (if one does not already exist for this
purpose) and a service that runs and maintains the task's desired count.
It is reversible — deleting the service stops the task. The `awsvpc`
network mode requires `networkConfiguration` on the service.

```bash
aws ecs create-cluster --cluster-name gram-tunnel-cluster
aws ecs create-service \
  --cluster gram-tunnel-cluster \
  --service-name gram-tunnel \
  --task-definition gram-tunnel-agent \
  --desired-count 1 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[<PRIVATE_SUBNET_ID>],securityGroups=[<SECURITY_GROUP_ID>],assignPublicIp=DISABLED}"
```

`<PRIVATE_SUBNET_ID>` and `<SECURITY_GROUP_ID>` come from
[Confirm outbound egress to the tunnel gateway](#confirm-tunnel-egress).
`assignPublicIp=DISABLED` because the task runs in a private subnet
reached via NAT — this is also the documented default.

**Verify**:

```bash
aws ecs describe-services --cluster gram-tunnel-cluster --services gram-tunnel
```

Expect `"runningCount": 1` and `"status": "ACTIVE"`.

A task stuck in `PENDING` usually means the security group or subnet has
no route to pull the image over the internet/NAT — revisit
[Confirm outbound egress to the tunnel gateway](#confirm-tunnel-egress).
`RESOURCE:ENI` limit errors mean the account's ENI quota for the
instance/subnet is exhausted — a day-two capacity concern outside this
guide's scope.

The cluster name `gram-tunnel-cluster` and service name `gram-tunnel`
are this guide's choice, substitutable; `desired-count` of `1` matches
the single-replica Kubernetes example.

## EC2-host variant

### Choose the access path and launch the EC2 instance

This launches a new EC2 instance if you do not already have one to run
the agent on. It is reversible — an instance can be terminated — but
terminating it stops the tunnel.

**Choose the access path before you launch.** A key pair cannot be
attached to `run-instances` after the instance already exists, and the
instance sits in a private subnet with no path in from outside the
VPC — the steps below (installing Docker, writing the environment
file, enabling the unit) all need a working shell on this instance
before they can run. Pick one of these two documented, substitutable
access paths per your own account's access standard:

- **SSH via an EC2 key pair.** Requires `--key-name` at launch and a
  security group rule permitting inbound TCP 22 from wherever you
  connect — your own choice of bastion, VPN, or other path into a
  private subnet.
- **AWS Systems Manager Session Manager.** No inbound port and no key
  pair: Session Manager starts an outbound-initiated session over the
  SSM Agent already present on current Amazon Linux AMIs, provided the
  instance's IAM instance profile carries the AWS-managed policy
  `AmazonSSMManagedInstanceCore`, and the same outbound-443 egress path
  this guide already confirms in
  [Confirm outbound egress to the tunnel gateway](#confirm-tunnel-egress)
  (Session Manager also dials out over 443).

**This guide's remaining EC2-host steps assume Session Manager** — it
needs no inbound security-group rule and no key-pair distribution,
matching the outbound-only posture the tunnel agent itself already
requires. The SSH path above is the substitutable alternative if your
access standard requires it.

First create the instance profile and attach the managed policy:

```bash
aws iam create-role \
  --role-name gram-tunnel-instance-role \
  --assume-role-policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"Service":"ec2.amazonaws.com"},"Action":"sts:AssumeRole"}]}'
aws iam attach-role-policy \
  --role-name gram-tunnel-instance-role \
  --policy-arn arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore
aws iam create-instance-profile --instance-profile-name gram-tunnel-instance-profile
aws iam add-role-to-instance-profile \
  --instance-profile-name gram-tunnel-instance-profile \
  --role-name gram-tunnel-instance-role
```

Then launch with that instance profile and no `--key-name`, since
Session Manager needs none:

```bash
aws ec2 run-instances \
  --image-id <AMI_ID> \
  --instance-type t3.micro \
  --subnet-id <PRIVATE_SUBNET_ID> \
  --security-group-ids <SECURITY_GROUP_ID> \
  --iam-instance-profile Name=gram-tunnel-instance-profile \
  --count 1
```

- `<AMI_ID>` — your own chosen AMI; this guide does not pick one, AMI
  selection is a day-two/account-policy choice outside its scope, but it
  must carry the SSM Agent preinstalled or installable — current Amazon
  Linux AMIs do.
- `<PRIVATE_SUBNET_ID>` and `<SECURITY_GROUP_ID>` come from
  [Confirm outbound egress to the tunnel gateway](#confirm-tunnel-egress).

For the substitutable SSH path instead, add `--key-name <KEY_PAIR_NAME>`
in place of `--iam-instance-profile` and skip the role/profile commands
above.

**Verify**:

```bash
aws ec2 describe-instances --filters "Name=instance-state-name,Values=running" --query "Reservations[].Instances[].InstanceId"
aws ssm describe-instance-information --filters "Key=InstanceIds,Values=<INSTANCE_ID>"
```

Expect the new instance ID listed with state `running`, and (a minute
or two after boot, once the SSM Agent has registered) the same instance
ID present in the `describe-instance-information` response — confirming
Session Manager can reach it before you depend on that access path for
the steps below.

If the instance launches but has no route to the internet, the subnet
lacks a NAT path — revisit
[Confirm outbound egress to the tunnel gateway](#confirm-tunnel-egress);
Session Manager cannot register either, since it also needs outbound
443. If the instance never appears in `describe-instance-information`,
the instance profile is missing or lacks
`AmazonSSMManagedInstanceCore`, or the SSM Agent is not present on the
chosen AMI.

`t3.micro` is a starting point sized for a single lightweight proxy
process, not a requirement — no source consulted for this guide states a
CPU/memory requirement for the agent process, so this is the smallest
generally-available instance type, not a sized recommendation. The
access path itself (Session Manager vs. SSH/key pair) is a starting
point per your own access standard, not a requirement — everything else
in this step (role name, instance-profile name) is this guide's choice.

### Install and enable Docker on the instance

This installs the Docker package and starts the Docker service on the
instance. It is reversible (`sudo yum remove docker`).

Connect to the instance first, using the access path chosen in
[Choose the access path and launch the EC2 instance](#ec2-launch-instance)
— this guide's remaining steps assume Session Manager:

```bash
aws ssm start-session --target <INSTANCE_ID>
```

This requires the Session Manager plugin installed locally. The
remaining commands in this and the following step run in that session,
on the instance itself.

**This guide picks Amazon Linux 2023 as the EC2-host target's AMI** and
documents Docker's install path for that AMI only — if you launched a
different AMI in
[Choose the access path and launch the EC2 instance](#ec2-launch-instance),
substitute that AMI's own documented Docker install procedure; this
guide does not attempt to cover every distribution.

```bash
sudo yum update -y
sudo yum install docker
sudo systemctl enable --now docker.service
sudo usermod -a -G docker ec2-user
```

The AWS ECS Developer Guide's "Installing Docker on AL2023" procedure
documents `sudo yum update -y`, `sudo yum install docker`, and
`sudo service docker start` followed by adding `ec2-user` to the
`docker` group. This guide substitutes
`sudo systemctl enable --now docker.service` for `sudo service docker
start`, because the systemd unit created below depends on the Docker
daemon being both started now and started automatically on every future
boot — `service docker start` does neither past the current session.
The `usermod` step is optional: the systemd unit below runs `docker` via
`sudo`, so no interactive shell needs passwordless `docker` access; it
is carried from the cited AWS procedure only for a reader who also wants
to run ad hoc `docker` commands in the session without `sudo`.

**Verify**:

```bash
sudo systemctl is-active docker.service
sudo systemctl is-enabled docker.service
docker info
```

Expect `active`, `enabled`, and `docker info` to print daemon details
without the "Cannot connect to the Docker daemon" error.

If `docker info` fails with "Cannot connect to the Docker daemon. Is the
docker daemon running on this host?", the cited AWS procedure notes this
can require an instance reboot to pick up group membership or driver
state. If `systemctl enable --now docker.service` itself fails, the package may
not have installed the unit under that name. Run `systemctl status
docker` to see the unit's real name and state, and use that name in the
`enable --now` command and in the `Requires=`/`After=` lines of the unit
you create in the next step.

`sudo yum install docker` and the AL2023 AMI choice are this guide's
starting point per the cited AWS procedure, not a requirement — if you
are on a different AMI or Linux distribution, install Docker by that
distribution's own documented method; the remaining steps are unaffected
as long as `docker run` and `docker logs` are available afterward.

### Write the environment file, then supervise the agent container

This writes the systemd `EnvironmentFile` and creates a systemd unit that
runs the tunnel agent's container image
(`ghcr.io/speakeasy-api/gram-tunnel-agent:0.1.0`) via `docker run` **in
the foreground**, so systemd itself supervises the container process and
restarts it on failure and on instance boot. **The unit does not run
`docker run -d`**: a detached container exits in the background from
systemd's point of view the instant `docker run -d` returns, so
`Restart=` would restart a command that already succeeded (starting a
container) rather than one that failed, and systemd would have no live
process to supervise. Running the container in the foreground makes
`ExecStart` the container process itself, so `Restart=on-failure`
restarts the *container*, not merely the launcher.

**Ordering matters and is fatal if reversed.** `systemd.service(5)`
documents that if the file named by an unprefixed `EnvironmentFile=` "does
not exist, cannot be read, or contains invalid content, the service will
fail to start." This guide does not use the `-` prefix that would make
the file optional, because a silently-missing environment file is a
worse failure than a loud one for a unit holding the tunnel key. Create
the directory and the file below **before** `systemctl enable --now`
runs, not after — reversing this order means the unit's own first start
fails and this step's Verify cannot pass.

Create the directory and the environment file with restrictive
permissions, since it holds `TUNNEL_KEY`:

```bash
sudo mkdir -p /etc/gram-tunnel
sudo tee /etc/gram-tunnel/env > /dev/null <<'EOF'
TUNNEL_GATEWAY_URL=wss://tunnel.speakeasy.com/connect
TUNNEL_KEY=<YOUR_TUNNEL_KEY>
TUNNEL_LOCAL_MCP_URL=<local MCP URL>
TUNNEL_SERVICE_VERSION=<service version>
EOF
sudo chmod 600 /etc/gram-tunnel/env
```

`chmod 600` restricts the file to the owner (`root`, since it is written
via `sudo tee`) — the mitigation for holding a secret in the process
environment rather than a managed secret store, passed to the container
via `docker run --env-file`, never inlined as a `-e` flag, so
`TUNNEL_KEY` never appears in the unit file, `docker ps`, or shell
history. `<YOUR_TUNNEL_KEY>`, `<local MCP URL>`, and `<service version>`
are populated in
[Speakeasy deployment](#deploy-speakeasy-workload).

Then create the unit and enable it, now that the file it depends on
exists:

```ini
# /etc/systemd/system/gram-tunnel.service
[Unit]
Description=Speakeasy tunnel agent
After=docker.service network-online.target
Requires=docker.service
Wants=network-online.target

[Service]
EnvironmentFile=/etc/gram-tunnel/env
ExecStartPre=-/usr/bin/docker rm -f gram-tunnel
ExecStart=/usr/bin/docker run --name gram-tunnel --env-file /etc/gram-tunnel/env ghcr.io/speakeasy-api/gram-tunnel-agent:0.1.0
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now gram-tunnel.service
```

`Requires=docker.service` and `After=docker.service` make the unit's
own dependency on the Docker daemon explicit rather than relying on
boot-order luck. `ExecStartPre=-/usr/bin/docker rm -f gram-tunnel` (the
leading `-` makes a non-zero exit non-fatal) removes a stale container
of the same name left over from a previous crashed run, since `docker
run --name` fails if a container by that name already exists — without
it, a restart after a crash that left the old container in an
exited-but-not-removed state would loop on that error instead of
recovering. No `--rm` flag is used on the `docker run` in `ExecStart`,
because `--rm` deletes the container the instant the foreground process
exits, racing systemd's own view of the unit's state; `ExecStartPre`
cleans up the previous container explicitly instead.

This guide does not inline the tunnel key into the unit file itself: an
`EnvironmentFile` with restrictive permissions, passed via `--env-file`,
keeps the key out of shell history and process listings, unlike passing
it directly on a command line.

**Verify**:

```bash
stat -c '%a %n' /etc/gram-tunnel/env
systemctl is-active gram-tunnel.service
docker logs gram-tunnel --tail 20
```

Expect `600 /etc/gram-tunnel/env`, `active`, and the log tail to show
`tunnel agent connected`, not merely the first-seen `tunnel-agent
starting` line (see
[Speakeasy deployment](#deploy-speakeasy-workload) for the
full readiness contract). This is the same readiness line every other
compute target's Verify reads — `docker logs` is this target's form of
that same check, parallel to `kubectl logs` (EKS) and `aws logs tail` /
CloudWatch (ECS Fargate).

If `/etc/gram-tunnel/env` does not exist at start time, `systemctl
enable --now` exits non-zero and `systemctl is-active` shows `failed` —
the ordering above prevents this; if it happens anyway,
`journalctl -u gram-tunnel.service` shows "Failed to load environment
files" or similar. `docker run` fails with "Cannot connect to the Docker
daemon" if Docker (from
[Install and enable Docker on the instance](#ec2-install-docker)) is not
active — `Requires=docker.service` surfaces this as the unit failing to
start rather than starting and immediately erroring. The container
restart-loops (climbing restart count visible in `systemctl status
gram-tunnel.service`) if `TUNNEL_KEY` or `TUNNEL_LOCAL_MCP_URL` is
malformed, visible in `docker logs gram-tunnel`.

The unit name (`gram-tunnel.service`), the container name
(`gram-tunnel`), `RestartSec=5s`, and the `EnvironmentFile` path are this
guide's starting point, not a requirement — any process supervisor
documented for your own AMI/distribution that can run `docker run` in
the foreground and restart it on failure achieves the same effect.

This deploys the Speakeasy tunnel agent onto the compute target you set
up in External setup: an EKS node group, an ECS Fargate task, or a
Docker container on an EC2 host, supervised by systemd. Each variant
below is self-contained — follow only the one matching your target.

### Pull the tunnel agent image

The image is published publicly on GHCR. No registry credentials are
required — GHCR issues an anonymous pull token, which Kubernetes and the
ECS agent handle transparently. Do not add an `imagePullSecret`, a
`docker login`, or any other credential step for this image.

For the EKS and ECS Fargate targets, verify the pinned tag is
resolvable before deploying:

```bash
docker manifest inspect ghcr.io/speakeasy-api/gram-tunnel-agent:0.1.0
```

The EC2-host target's systemd unit pulls the image implicitly on its
first `docker run` — Docker pulls an image it does not already have
locally. The same `docker manifest inspect` command above works there
once Docker itself is installed and running (see
[Install and enable Docker on the instance](#ec2-install-docker)).

### Deploy the tunnel agent

**Kubernetes (EKS node group).** The Secret carries the tunnel key; the
Deployment runs one replica of the agent, created against the cluster
confirmed in
[Confirm cluster access and the node/pod security group](#eks-confirm-cluster-access):

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: gram-tunnel-key
type: Opaque
stringData:
  TUNNEL_KEY: "<YOUR_TUNNEL_KEY>"
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: gram-tunnel
spec:
  replicas: 1
  selector:
    matchLabels:
      app: gram-tunnel
  template:
    metadata:
      labels:
        app: gram-tunnel
    spec:
      containers:
        - name: tunnel-agent
          image: ghcr.io/speakeasy-api/gram-tunnel-agent:0.1.0
          env:
            - name: TUNNEL_KEY
              valueFrom:
                secretKeyRef:
                  name: gram-tunnel-key
                  key: TUNNEL_KEY
            - name: TUNNEL_LOCAL_MCP_URL
              value: "<local MCP URL>"
            - name: TUNNEL_GATEWAY_URL
              value: "wss://tunnel.speakeasy.com/connect"
            - name: TUNNEL_SERVICE_VERSION
              value: "<service version>"
```

Set `<local MCP URL>` to the in-cluster Streamable HTTP endpoint you
located in
[Locate the reachable address of the existing MCP server](#locate-mcp-server),
in the form
`http://<MCP_SERVICE_NAME>.<NAMESPACE>.svc.cluster.local:<MCP_PORT>/mcp`.
Set `<service version>` to your own MCP service's version string.

The image tag is pinned to `0.1.0` here rather than the Control Plane
setup screen's `:latest`, so this guide's behavior does not change under
you later. The Deployment name (`gram-tunnel`) is this guide's own name,
not the Control Plane setup screen's scratch `gram-tunnel-test` name.

**ECS Fargate.** The secret you created in
[Create the tunnel key secret](#ecs-create-secret), and the
task definition and service you registered in
[Register the task definition](#ecs-register-task-definition)
and
[Create the cluster and the awsvpc service](#ecs-create-service),
already *are* this step for the ECS target — ECS has no separate "apply
a manifest" moment distinct from creating the secret, registering the
task definition, and creating the service. `TUNNEL_KEY` is supplied via
the task definition's `secrets` parameter, referencing the Secrets
Manager secret you created for it, rather than via `environment`.

**Docker (EC2 host).** The tunnel agent's own published image
(`ghcr.io/speakeasy-api/gram-tunnel-agent:0.1.0`, the same image and tag
the EKS and ECS Fargate variants run above), launched via `docker run`
in the foreground by the systemd unit you created in
[Write the environment file, then supervise the agent container](#ec2-supervise-agent)
— never `docker run -d`, and never as a one-off manual command, so
systemd supervises the actual container process, not just the command
that started it.

Populate the environment file loaded by that unit:

```ini
# /etc/gram-tunnel/env
TUNNEL_GATEWAY_URL=wss://tunnel.speakeasy.com/connect
TUNNEL_KEY=<YOUR_TUNNEL_KEY>
TUNNEL_LOCAL_MCP_URL=<local MCP URL>
TUNNEL_SERVICE_VERSION=<service version>
```

```ini
# /etc/systemd/system/gram-tunnel.service (relevant line; full unit in #ec2-supervise-agent)
ExecStart=/usr/bin/docker run --name gram-tunnel --env-file /etc/gram-tunnel/env ghcr.io/speakeasy-api/gram-tunnel-agent:0.1.0
```

Set `<local MCP URL>` to the private DNS name or IP you located in
[Locate the reachable address of the existing MCP server](#locate-mcp-server),
reachable from the instance's subnet, in the form
`http://<MCP_PRIVATE_DNS_OR_IP>:<MCP_PORT>/mcp`. Set
`<service version>` to your own MCP service's version string.
`TUNNEL_KEY` reaches the container only via `--env-file`, sourced from
the root-owned, `0600` file above — never inlined as a `docker run -e`
flag, per K4.

**Verify** (all three targets):

The agent exposes **no health port and no readiness probe**. Readiness is
observable only in its logs: it writes structured JSON to stdout (Go
`slog`, Info level), so every line carries `level`, `msg`, and named
attributes. Three messages matter, in order:

| `msg` | Means |
| --- | --- |
| `tunnel-agent starting` (`gateway`, `local_mcp`) | process up, nothing dialed |
| `tunnel agent connected` (`gateway`) | **the tunnel is up** |
| `tunnel hello received` (`tunnel_id`, `session_id`) | gateway handshake complete |

A pod, task, or unit sitting in `Running`/`active` with only the first
line has started and has **not** dialed — that distinction is the whole
point of this check, so read the log rather than stopping at
process/pod/task status:

- EKS: `kubectl logs -l app=gram-tunnel --tail=20` (see
  [Save the manifest and apply the tunnel agent Deployment (EKS)](#eks-deploy-tunnel-agent)).
- ECS Fargate: `aws logs tail /ecs/gram-tunnel-agent`, or the CloudWatch
  console.
- EC2-host: `docker logs gram-tunnel --tail 20` (see
  [Write the environment file, then supervise the agent container](#ec2-supervise-agent)).

A fourth message, `tunnel-agent init failed`, means the agent rejected
its own configuration at startup and exited non-zero — most often a
`TUNNEL_GATEWAY_URL` missing a host or not using `wss://` (the agent
permits `http(s)://` only for `localhost` and `host.docker.internal`), or
a missing `TUNNEL_SERVICE_VERSION`. Both variables are required on every
target; a task, pod, or unit that omits `TUNNEL_SERVICE_VERSION` is
expected to fail startup, not run with a default.

### Supply the tunnel key

`TUNNEL_KEY` is issued by the Control Plane on the tunnel setup screen
and consumed as shown above, per target. `<YOUR_TUNNEL_KEY>` is the only
literal form that may appear here: never a real key, never a
realistic-looking fake. No target inlines the key directly into a
command line or an unrestricted file — Kubernetes uses `secretKeyRef`,
ECS Fargate uses the `secrets` task-definition parameter backed by
Secrets Manager, and the EC2-host target uses a permission-restricted
`EnvironmentFile` loaded by the systemd unit.

Keys are `gram_tunnel_` followed by hex. The Control Plane stores only a
hash and a short prefix of the key, never the value — which is why the
**Key prefix** shown on the tunneled source's detail view (see
[Verify the tunnel](#verify-speakeasy-deployment) below) is how you tell
which key a running deployment is using.

**Rotation is not transparent.** Re-issuing a key in the Control Plane
replaces the stored hash immediately — the previous key stops validating
as soon as you do, and a running agent still holding it fails to
re-establish its session. After rotating, update the secret **and
restart the agent**:

- EKS: update the `gram-tunnel-key` Secret, then
  `kubectl rollout restart deployment/gram-tunnel`.
- ECS Fargate: update the Secrets Manager secret, then force a new
  deployment: `aws ecs update-service --cluster gram-tunnel-cluster --service gram-tunnel --force-new-deployment`.
- EC2-host: edit `/etc/gram-tunnel/env`, then
  `sudo systemctl restart gram-tunnel.service`.

Rotating the key without restarting the agent leaves it running against
a key the Control Plane no longer accepts.

### Verify the tunnel

The end-to-end check: the tunneled server appears in the registry and a
tool call round-trips through it. In the Control Plane, the tunneled
source's detail view carries a **Connection** badge reading exactly
**Connected**, **Never connected**, or **Inactive**, alongside **Last
seen** (relative time), **Lifecycle**, **Key prefix**, **Source ID**, and
**Linked MCP servers**. *Connected* with a recent *Last seen* is the end
state you are looking for, for every compute target.

<!-- TODO(human): how long registration takes, and whether the
     tunneled-source UI is generally available. It sits behind a feature
     flag in the dashboard as observed; this guide should not send you to
     a screen your project may not have. -->

Each failure mode has its own distinct log line — read it via the log
command named in [Deploy the tunnel agent](#deploy-speakeasy-workload)'s
Verify above:

- **Agent cannot reach the gateway** — logs `tunnel agent session ended`
  (warning), then a reconnect loop of `tunnel agent reconnecting` with a
  backoff duration. Maps onto
  [Confirm outbound egress to the tunnel gateway](#confirm-tunnel-egress):
  outbound `wss://` to the gateway on 443 is blocked — an egress rule, a
  proxy, or a missing NAT path. The fix belongs in External setup, not
  here.
- **Agent cannot reach the local MCP server** — logs `tunnel agent
  upstream error`. `TUNNEL_LOCAL_MCP_URL` is wrong, or the agent is not
  placed where that address resolves — for the EKS target, check for a
  missing Security Groups for Pods inbound rule (see
  [Save the manifest and apply the tunnel agent Deployment (EKS)](#eks-deploy-tunnel-agent));
  for ECS Fargate and EC2-host, check the task or instance's security
  group or subnet for a route to the MCP server's address (see
  [Locate the reachable address of the existing MCP server](#locate-mcp-server)
  and
  [Confirm outbound egress to the tunnel gateway](#confirm-tunnel-egress)).
  The tunnel itself is fine in this case.

A third failure never reaches either state: **configuration rejected at
startup** logs `tunnel-agent init failed` and exits non-zero — see
[Deploy the tunnel agent](#deploy-speakeasy-workload) above.

<!-- TODO(human): the further-reading URL for Speakeasy's tunnel
     documentation — not supplied by any source consulted. -->
This guide covers deployment only. For anything beyond it — scaling,
upgrades, monitoring — see Speakeasy's tunnel documentation.

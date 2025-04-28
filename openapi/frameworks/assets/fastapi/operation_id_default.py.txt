def generate_unique_id(route: "APIRoute") -> str:
    operation_id = route.name + route.path_format
    operation_id = re.sub(r"\W", "_", operation_id)
    assert route.methods
    operation_id = operation_id + "_" + list(route.methods)[0].lower()
    return operation_id
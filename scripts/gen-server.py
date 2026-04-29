import yaml
import os
import re

def generate():
    target_dir = "src/server"
    os.makedirs(target_dir, exist_ok=True)

    # files to create
    test_filename = "test-api.js"
    server_filename = "app-server.ts"

    # 1. Load the spec
    spec_path = 'openapi.yaml'
    if not os.path.exists(spec_path):
        raise FileNotFoundError(f"Error: {spec_path} not found")

    with open(spec_path, 'r') as f:
        spec = yaml.safe_load(f)

    # 2. Start building the Express file
    server_code = [
        'import express from "express";',
        f'import * as APIs from "./{test_filename}";',
        '',
        'const app = express();',
        'app.use(express.json());',
        'const PORT = 3000;',
    ]

    test_code = [
        '//OPTIONAL FILE: configure test for the server',
        f'import * as Models from "../../generated-api/models/index.ts";',
    ]

    # 3. Process Paths
    paths = spec.get('paths', {})
    for path, methods in paths.items():
        # Convert OpenAPI path {id} to Express :id
        express_path = path.replace('{', ':').replace('}', '')
        
        for method, details in methods.items():
            if method.lower() not in ['get', 'post', 'put', 'delete', 'patch']:
                continue

            # Priority 1: Use operationId
            # Priority 2: Generate from method and path
            op_id = details.get('operationId')
            if not op_id:
                # Fallback: e.g., get_solutions_id_helpful
                clean_path = re.sub(r'[^a-zA-Z0-0]', '_', path).strip('_')
                op_id = f"{method.lower()}_{clean_path}"
            
            summary = details.get('summary', op_id)
            
            server_code.append("")
            server_code.append(f'// {summary}')
            server_code.append(f'app.{method.lower()}("{express_path}", APIs.{op_id});')

            test_code.append("")
            test_code.append(f"export function {op_id}(request, response){{")
            test_code.append(f"    // Logic for {op_id}")
            test_code.append("}")

    # 4. Finalize
    server_code.append('\napp.listen(PORT, () => {')
    server_code.append('    console.log(`🚀 Solutions API live at http://localhost:${PORT}`);')
    server_code.append('});')

    # Write to files

    # CREATE TEST FILE
    test_file = os.path.join(target_dir, test_filename)
    with open(test_file, 'w') as f:
        f.write("\n".join(test_code))

    # CREATE SERVER FILE
    server_file = os.path.join(target_dir, server_filename)
    with open(server_file, 'w') as f:
        f.write("\n".join(server_code))
    
if __name__ == "__main__":
    generate()

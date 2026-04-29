import yaml
import os
import re

def generate():
    # 1. Load the spec
    spec_path = 'openapi.yaml'
    if not os.path.exists(spec_path):
        print(f"Error: {spec_path} not found")
        return

    with open(spec_path, 'r') as f:
        spec = yaml.safe_load(f)

    # 2. Start building the Express file
    code = [
        'import express from "express";',
        'import * as APIs from "./test-api.js";',
        'import * as Models from "../generated-api/models/index.js";',
        '',
        'const app = express();',
        'app.use(express.json());',
        'const PORT = 3000;',
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
            
            code.append("")
            code.append(f'// {summary}')
            code.append(f'app.{method.lower()}("{express_path}", APIs.{op_id});')

    # 4. Finalize
    code.append('\napp.listen(PORT, () => {')
    code.append('    console.log(`🚀 Solutions API live at http://localhost:${PORT}`);')
    code.append('});')

    # 5. Write to file
    dir = 'src/server'
    os.makedirs(dir, exist_ok=True)
    os.chdir(dir)
    server_file = "app-server.ts"
    with open(server_file, 'w') as f:
        f.write("\n".join(code))
    print(f"Successfully generated {server_file}")

if __name__ == "__main__":
    generate()

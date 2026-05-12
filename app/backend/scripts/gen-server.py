import yaml
from pathlib import Path
import re

example = '''
//--------------- Category Example -------------------
const categories: Models.Category[] = [
    { id: "1", name: "web dev", slug: "web-dev" },
    { id: "1", name: "iot", slug: "iot" },
    { id: "1", name: "Machine Learning", slug: "machine-learning" },
];
// -------------------------------------------
'''

getCategoryFunc = '''
export function getCategories(request: Request, response: Response){
    // Logic for getCategories
    response.send({ data: categories });
}
'''

HTTP_METHODS = {"get", "post", "put", "delete", "patch"}


def generate():
    target_dir = Path("server")
    target_dir.mkdir(exist_ok=True)

    api_config = target_dir / "api-config.ts"
    server_file = target_dir / "app-server.ts"

    test_exists = api_config.exists()
    server_exists = server_file.exists()

    if test_exists and server_exists:
        print("Both logical files exists")
        return

    spec_path = Path(__file__).resolve().parents[3] / "openapi.yaml"
    if not spec_path.exists():
        raise FileNotFoundError(f"{spec_path.name} not found")

    with open(spec_path, "r") as f:
        spec = yaml.safe_load(f)

    version = "/api/v1"
    paths = spec.get("paths", {})

    server_code = None
    test_code = None

    if not server_exists:
        server_code = [
            'import express from "express";',
            f'import * as APIs from "./{api_config.name}";',
            '',
            'const app = express();',
            'app.use(express.json());',
            'const PORT = 3000;',
        ]

    if not test_exists:
        test_code = [
            '//OPTIONAL FILE: configure test for the server',
            'import * as Models from "solutions-api-sdk/models/index.ts";',
            'import type { Request, Response } from "express";',
            '',
            example,
        ]

    for path, methods in paths.items():
        express_path = version + re.sub(r"{(.*?)}", r":\1", path)

        for method, details in methods.items():
            method_lower = method.lower()
            if method_lower not in HTTP_METHODS:
                continue

            op_id = details.get("operationId")
            if not op_id:
                clean = re.sub(r"[^a-zA-Z0-9]", "_", path).strip("_")
                op_id = f"{method_lower}_{clean}"

            summary = details.get("summary", op_id)

            if server_code is not None:
                server_code.append("")
                server_code.append(f"// {summary}")
                server_code.append(
                    f'app.{method_lower}("{express_path}", APIs.{op_id});'
                )

            if test_code is not None:
                if op_id == "getCategories":
                    test_code.append("")
                    test_code.append(getCategoryFunc)
                    continue

                test_code.append("")
                test_code.append(
                    f"export function {op_id}(request: Request, response: Response){{"
                )
                test_code.append(f"    // Logic for {op_id}")
                test_code.append("}")

    if server_code is not None:
        server_code.extend([
            "",
            "app.listen(PORT, () => {",
            '    console.log(`🚀 Solutions API live at http://localhost:${PORT}`);',
            "});"
        ])

        server_file.write_text("\n".join(server_code), encoding="utf-8")

    if test_code is not None:
        api_config.write_text("\n".join(test_code), encoding="utf-8")


if __name__ == "__main__":
    generate()
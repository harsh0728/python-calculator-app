from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import math
import os

app = FastAPI()

# Serve static files
app.mount("/static", StaticFiles(directory="static"), name="static")


class CalculationRequest(BaseModel):
    expression: str


def safe_eval(expression: str) -> float:
    """
    Safely evaluate a mathematical expression.
    Only allows basic arithmetic and math functions.
    """
    # Remove whitespace
    expression = expression.strip()
    
    # Define allowed names for eval
    allowed_names = {
        'sin': math.sin,
        'cos': math.cos,
        'tan': math.tan,
        'sqrt': math.sqrt,
        'abs': abs,
        'pow': pow,
        'pi': math.pi,
        'e': math.e,
    }
    
    try:
        # Replace ^ with ** for exponentiation
        expression = expression.replace('^', '**')
        
        # Evaluate the expression
        result = eval(expression, {"__builtins__": {}}, allowed_names)
        
        # Ensure result is a number
        if isinstance(result, (int, float)):
            return float(result)
        else:
            raise ValueError("Invalid expression result")
    except Exception as e:
        raise ValueError(f"Invalid expression: {str(e)}")


@app.get("/")
async def root():
    return FileResponse("static/index.html")


@app.post("/calculate")
async def calculate(request: CalculationRequest):
    try:
        result = safe_eval(request.expression)
        return {
            "success": True,
            "result": result,
            "expression": request.expression
        }
    except ValueError as e:
        return {
            "success": False,
            "error": str(e),
            "expression": request.expression
        }


@app.get("/health")
async def health():
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)

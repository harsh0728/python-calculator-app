# Calculator App

A modern web-based calculator application built with FastAPI and vanilla JavaScript.

## Features

- **Basic Arithmetic**: Addition, subtraction, multiplication, and division
- **Advanced Functions**: Square root, trigonometric functions (sin, cos, tan)
- **Constants**: Support for π (pi) and e (Euler's number)
- **User-Friendly Interface**: Clean, modern design with smooth interactions
- **Error Handling**: Graceful error messages for invalid expressions
- **Keyboard Support**: Use your keyboard to enter numbers and press Enter to calculate

## Project Structure

```
calculator-app/
├── app.py                 # FastAPI application
├── requirements.txt       # Python dependencies
├── README.md             # This file
├── .gitignore            # Git ignore rules
└── static/
    ├── index.html        # HTML structure
    ├── styles.css        # Styling
    └── script.js         # JavaScript functionality
```

## Installation

### Prerequisites
- Python 3.8 or higher
- pip (Python package installer)

### Setup

1. **Clone the repository** (or extract if downloaded as zip)
   ```bash
   git clone <repository-url>
   cd calculator-app
   ```

2. **Create a virtual environment** (recommended)
   ```bash
   # On macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   
   # On Windows
   python -m venv venv
   venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

## Running the Application

1. **Start the server**
   ```bash
   python app.py
   ```
   
   Or using uvicorn directly:
   ```bash
   uvicorn app:app --reload --host 127.0.0.1 --port 8000
   ```

2. **Open your browser**
   - Navigate to: `http://127.0.0.1:8000`

3. **Start calculating!**

## Usage

### Basic Calculator Operations
- Click number buttons to enter digits
- Click operator buttons (+, −, ×, ÷) to perform operations
- Click the = button to calculate the result
- Use AC to clear all, DEL to delete the last character

### Advanced Functions
- **√ (Square Root)**: Click √ and enter a number, e.g., `√16 = 4`
- **sin/cos/tan**: Click the function and enter an angle in radians
- **π (Pi)**: Click π to insert 3.14159...
- **e**: Click e to insert Euler's number

### Keyboard Shortcuts
- **Numbers**: Type 0-9
- **Operators**: Type `+`, `-`, `*`, `/`
- **Decimal**: Type `.`
- **Calculate**: Press `Enter`
- **Delete**: Press `Backspace`

## Examples

```
2 + 3 × 4 = 14
√16 = 4
sin(π/2) = 1
(10 + 5) / 3 = 5
```

## Technical Details

### Backend (FastAPI)
- Safely evaluates mathematical expressions
- Supports basic operators: +, −, ×, ÷, ^
- Supports math functions: sin, cos, tan, sqrt, abs, pow
- Supports constants: π, e
- Error handling for invalid expressions

### Frontend (Vanilla JavaScript)
- No dependencies required
- Clean, responsive UI using CSS Grid
- Real-time display updates
- Keyboard input support
- Network communication via Fetch API

## API Endpoints

### POST `/calculate`
Calculate a mathematical expression.

**Request:**
```json
{
  "expression": "2 + 3 * 4"
}
```

**Response (Success):**
```json
{
  "success": true,
  "result": 14,
  "expression": "2 + 3 * 4"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Invalid expression: ...",
  "expression": "invalid"
}
```

### GET `/health`
Check if the server is running.

**Response:**
```json
{
  "status": "ok"
}
```

## Development

### To modify the calculator:
1. Backend logic: Edit `app.py`
2. Frontend UI: Edit `static/index.html` and `static/styles.css`
3. JavaScript functionality: Edit `static/script.js`

### Testing the API manually:
```bash
curl -X POST "http://127.0.0.1:8000/calculate" \
  -H "Content-Type: application/json" \
  -d '{"expression": "2+3"}'
```

## Troubleshooting

**Port already in use:**
- Change the port in `app.py` from 8000 to another port (e.g., 8001)

**Module not found:**
- Make sure you've installed the requirements: `pip install -r requirements.txt`

**Browser can't connect:**
- Check that the server is running
- Verify the correct URL: `http://127.0.0.1:8000`

## Security Notes

- The calculator only allows safe mathematical expressions
- User input is validated and sanitized
- Dangerous functions (file I/O, system commands, etc.) are blocked

## License

This project is open source and available for personal and educational use.

## Contributing

Feel free to fork this repository and submit pull requests for improvements!

## Future Enhancements

- [ ] History of calculations
- [ ] Keyboard layout customization
- [ ] Dark mode support
- [ ] Export calculation history
- [ ] Unit conversion features
- [ ] Scientific calculator mode

# Quick Start Guide

## Extract and Setup

### Step 1: Extract the ZIP file
```bash
unzip calculator-app.zip
cd calculator-app
```

### Step 2: Create a Virtual Environment (Optional but Recommended)

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

**Windows (Command Prompt):**
```bash
python -m venv venv
venv\Scripts\activate
```

**Windows (PowerShell):**
```bash
python -m venv venv
venv\Scripts\Activate.ps1
```

### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 4: Run the Server
```bash
python app.py
```

You should see output like:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
```

### Step 5: Open in Browser
Open your web browser and navigate to:
```
http://127.0.0.1:8000
```

## Git Setup (Optional)

To initialize this as a Git repository and push to GitHub:

### 1. Initialize Git
```bash
git init
git add .
git commit -m "Initial commit: Calculator app with FastAPI"
```

### 2. Create a Repository on GitHub
- Go to https://github.com/new
- Create a new repository (e.g., "calculator-app")
- Copy the repository URL

### 3. Connect to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/calculator-app.git
git branch -M main
git push -u origin main
```

## Troubleshooting

### Port 8000 is already in use
Edit `app.py` and change this line:
```python
uvicorn.run(app, host="127.0.0.1", port=8001)  # Change 8000 to 8001
```

### ModuleNotFoundError: No module named 'fastapi'
Make sure you've:
1. Created the virtual environment
2. Activated it
3. Run `pip install -r requirements.txt`

### Connection refused
- Make sure the server is running (you should see the Uvicorn message)
- Check the URL is correct: `http://127.0.0.1:8000`

## Usage Examples

Try these calculations in the calculator:
- `2 + 3 * 4` → 14
- `(10 + 5) / 3` → 5
- `sqrt(16)` → 4
- `sin(pi/2)` → 1
- `cos(0)` → 1
- `3 ^ 2` → 9 (exponentiation with ^)

## File Structure

```
calculator-app/
├── app.py              # FastAPI backend
├── requirements.txt    # Python dependencies
├── README.md          # Full documentation
├── SETUP.md           # This file
├── .gitignore         # Git ignore file
└── static/
    ├── index.html     # Calculator HTML
    ├── styles.css     # Styling
    └── script.js      # Frontend logic
```

## Features Included

✓ Basic arithmetic (+, −, ×, ÷)
✓ Parentheses for order of operations
✓ Scientific functions (sqrt, sin, cos, tan)
✓ Constants (π, e)
✓ Keyboard support (numbers, operators, Enter to calculate)
✓ Clean, modern UI
✓ Real-time error messages

## Next Steps

1. **Customize**: Edit `static/styles.css` to change colors and styling
2. **Extend**: Add more functions to `app.py`
3. **Deploy**: Use Vercel, Heroku, or any Python hosting service
4. **Share**: Push to GitHub and share with others

Enjoy your calculator app! 🎉

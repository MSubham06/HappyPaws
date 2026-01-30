# ml_service/Dockerfile

FROM python:3.9-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app code
COPY . .

# Expose port
EXPOSE 5000

# Start with Gunicorn (Production Server)
# Make sure gunicorn is in your requirements.txt!
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]

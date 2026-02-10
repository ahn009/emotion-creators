#!/bin/bash
# Test script to verify the app renders correctly

echo "Testing EmotionCreator App..."
echo ""

# Check if server is running
if curl -s http://localhost:8080 > /dev/null; then
    echo "✓ Dev server is running"
else
    echo "✗ Dev server is not running"
    exit 1
fi

# Check if HTML is served
if curl -s http://localhost:8080 | grep -q '<div id="root">'; then
    echo "✓ HTML is being served correctly"
else
    echo "✗ HTML is not being served"
    exit 1
fi

# Check if main.tsx is loaded
if curl -s http://localhost:8080 | grep -q '/src/main.tsx'; then
    echo "✓ Main entry point is referenced"
else
    echo "✗ Main entry point is missing"
    exit 1
fi

echo ""
echo "All checks passed! ✓"
echo ""
echo "Open http://localhost:8080 in your browser to verify the app renders correctly."

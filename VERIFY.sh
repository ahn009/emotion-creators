#!/bin/bash
echo "╔════════════════════════════════════════════╗"
echo "║  EmotionCreator - Verification Script     ║"
echo "╚════════════════════════════════════════════╝"
echo ""

# Check if server is running
if curl -s http://localhost:8080 > /dev/null 2>&1; then
    echo "✅ Dev server is running"
else
    echo "❌ Dev server is NOT running"
    echo "   Run: npm run dev"
    exit 1
fi

# Check if page loads
if curl -s http://localhost:8080 | grep -q "EmotionCreator"; then
    echo "✅ Page loads correctly"
else
    echo "❌ Page not loading"
    exit 1
fi

# Check if no-auth mode is active
if grep -q "App.no-auth-full" src/main.tsx; then
    echo "✅ No-Auth mode is active"
else
    echo "⚠️  Auth mode is active (may cause white screen)"
fi

# Check build
echo ""
echo "Testing build..."
if npm run build > /tmp/build-test.log 2>&1; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi

echo ""
echo "╔════════════════════════════════════════════╗"
echo "║  ✅ ALL CHECKS PASSED                      ║"
echo "╚════════════════════════════════════════════╝"
echo ""
echo "🌐 Open: http://localhost:8080"
echo "📝 Docs: QUICK_START.md"
echo ""

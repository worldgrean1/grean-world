#!/bin/bash

echo "🚀 RUNNING GREAN WORLD PROJECT ANALYSIS NOW"
echo "==========================================="
echo ""

# Check if we can run TypeScript directly
if command -v ts-node &> /dev/null; then
    echo "📊 Running comprehensive TypeScript analysis..."
    ts-node scripts/execute-immediate-analysis.ts
elif command -v npx &> /dev/null; then
    echo "📊 Running analysis with npx..."
    npx ts-node scripts/execute-immediate-analysis.ts
else
    echo "📊 Running manual file analysis..."
    
    # Manual analysis fallback
    echo "🔍 MANUAL FILE SIZE ANALYSIS:"
    echo "============================="
    
    # Key files to check
    files=(
        "app/page.tsx"
        "components/premium/MobileLandingDemo.tsx"
        "components/static-nodes/inverter/InverterDisplay.tsx"
        "components/animations/power-flow-animation.tsx"
        "components/static-nodes/static-switch-node.tsx"
        "utils/sound.ts"
        "utils/error-logging.ts"
    )
    
    critical_count=0
    high_count=0
    medium_count=0
    
    for file in "${files[@]}"; do
        if [ -f "$file" ]; then
            lines=$(wc -l < "$file" 2>/dev/null || echo "0")
            
            if [ "$lines" -gt 400 ]; then
                echo "🚨 CRITICAL: $file ($lines lines) - IMMEDIATE REFACTORING"
                critical_count=$((critical_count + 1))
            elif [ "$lines" -gt 300 ]; then
                echo "🔴 HIGH: $file ($lines lines) - REFACTORING RECOMMENDED"
                high_count=$((high_count + 1))
            elif [ "$lines" -gt 200 ]; then
                echo "🟡 MEDIUM: $file ($lines lines) - MONITOR"
                medium_count=$((medium_count + 1))
            elif [ "$lines" -gt 100 ]; then
                echo "🟢 GOOD: $file ($lines lines)"
            else
                echo "✅ EXCELLENT: $file ($lines lines)"
            fi
        else
            echo "❓ NOT FOUND: $file"
        fi
    done
    
    echo ""
    echo "📊 SUMMARY:"
    echo "==========="
    echo "Critical files (400+): $critical_count"
    echo "High priority (300-400): $high_count"
    echo "Medium priority (200-300): $medium_count"
    
    echo ""
    echo "💡 RECOMMENDATIONS:"
    echo "==================="
    
    if [ $critical_count -gt 0 ]; then
        echo "🚨 IMMEDIATE ACTION: $critical_count critical files need refactoring"
        echo "   1. Create backup branch"
        echo "   2. Break large files into 4-6 components"
        echo "   3. Extract custom hooks"
        echo "   4. Test thoroughly"
    elif [ $high_count -gt 0 ]; then
        echo "🔴 HIGH PRIORITY: $high_count files need refactoring"
        echo "   1. Plan refactoring sessions"
        echo "   2. Extract 3-4 components per file"
        echo "   3. Focus on single responsibility"
    elif [ $medium_count -gt 0 ]; then
        echo "🟡 MEDIUM PRIORITY: $medium_count files to monitor"
        echo "   1. Watch for continued growth"
        echo "   2. Consider minor optimizations"
    else
        echo "🎉 EXCELLENT PROJECT HEALTH!"
        echo "   ✅ All files are well-sized"
        echo "   ✅ Ready for feature development"
        echo "   ✅ Deploy with confidence"
    fi
fi

echo ""
echo "🎯 NEXT STEPS BASED ON RESULTS:"
echo "==============================="
echo "1. Review the analysis results above"
echo "2. If critical/high priority files found:"
echo "   - Use the refactoring strategies provided"
echo "   - Break large components into focused pieces"
echo "   - Extract custom hooks for state management"
echo "3. If all files are good:"
echo "   - Continue with feature development"
echo "   - Set up deployment pipeline"
echo "   - Plan user testing"

echo ""
echo "✅ ANALYSIS COMPLETE!"
echo "===================="

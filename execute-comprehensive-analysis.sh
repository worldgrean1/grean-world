#!/bin/bash

echo "🔍 GREAN WORLD PROJECT - COMPREHENSIVE ANALYSIS"
echo "==============================================="
echo ""

# Step 1: File Size Analysis
echo "📊 STEP 1: Running File Size Analysis..."
echo "----------------------------------------"
if [ -f "scripts/analyze-file-sizes.js" ]; then
    node scripts/analyze-file-sizes.js
else
    echo "Creating and running file size analysis..."
    
    # Quick analysis of current files
    echo "🔍 Current TypeScript/React files over 200 lines:"
    find . -name "*.tsx" -o -name "*.ts" | grep -v node_modules | grep -v .next | xargs wc -l 2>/dev/null | awk '$1 > 200 {print $0}' | sort -nr
    
    echo ""
    echo "📋 Top 10 largest files:"
    find . -name "*.tsx" -o -name "*.ts" | grep -v node_modules | grep -v .next | xargs wc -l 2>/dev/null | sort -nr | head -10
fi

echo ""
echo "📈 STEP 2: Priority Assessment"
echo "------------------------------"

# Check key files that might need attention
priority_files=(
    "components/premium/MobileLandingDemo.tsx"
    "components/static-nodes/inverter/InverterDisplay.tsx" 
    "components/animations/power-flow-animation.tsx"
    "components/static-nodes/static-switch-node.tsx"
    "app/page.tsx"
    "utils/sound.ts"
    "utils/error-logging.ts"
)

echo "🎯 CHECKING PRIORITY FILES:"
for file in "${priority_files[@]}"; do
    if [ -f "$file" ]; then
        lines=$(wc -l < "$file" 2>/dev/null || echo "0")
        if [ "$lines" -gt 400 ]; then
            echo "   🚨 $file: $lines lines (CRITICAL - IMMEDIATE REFACTORING)"
        elif [ "$lines" -gt 300 ]; then
            echo "   🔴 $file: $lines lines (HIGH PRIORITY)"
        elif [ "$lines" -gt 200 ]; then
            echo "   🟡 $file: $lines lines (MEDIUM PRIORITY)"
        elif [ "$lines" -gt 100 ]; then
            echo "   🟢 $file: $lines lines (GOOD)"
        else
            echo "   ✅ $file: $lines lines (EXCELLENT)"
        fi
    else
        echo "   ❓ $file: NOT FOUND"
    fi
done

echo ""
echo "🎯 STEP 3: Recommendations"
echo "--------------------------"
echo "Based on the analysis above:"
echo ""
echo "🚨 CRITICAL (400+ lines): Immediate refactoring required"
echo "🔴 HIGH (300-400 lines): Plan refactoring within 1 week"  
echo "🟡 MEDIUM (200-300 lines): Monitor and consider optimization"
echo "🟢 GOOD (100-200 lines): Acceptable size"
echo "✅ EXCELLENT (<100 lines): Optimal size"

echo ""
echo "✅ ANALYSIS COMPLETE!"
echo "===================="

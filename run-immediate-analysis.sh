#!/bin/bash

echo "🚀 GREAN WORLD PROJECT - IMMEDIATE ANALYSIS"
echo "==========================================="
echo ""

# Function to analyze a single file
analyze_file() {
    local file="$1"
    if [ -f "$file" ]; then
        local lines=$(wc -l < "$file" 2>/dev/null || echo "0")
        local size=$(wc -c < "$file" 2>/dev/null || echo "0")
        
        # Determine priority based on lines
        if [ "$lines" -gt 500 ]; then
            echo "🚨 CRITICAL: $file"
            echo "   Lines: $lines | Size: ${size} bytes"
            echo "   → IMMEDIATE refactoring required - break into 6-8 components"
            return 4
        elif [ "$lines" -gt 350 ]; then
            echo "🔴 HIGH: $file"
            echo "   Lines: $lines | Size: ${size} bytes" 
            echo "   → High priority refactoring - extract 4-5 components"
            return 3
        elif [ "$lines" -gt 250 ]; then
            echo "🟡 MEDIUM: $file"
            echo "   Lines: $lines | Size: ${size} bytes"
            echo "   → Consider optimization - extract 2-3 components"
            return 2
        elif [ "$lines" -gt 150 ]; then
            echo "🟢 GOOD: $file"
            echo "   Lines: $lines | Size: ${size} bytes"
            echo "   → Good size - monitor for growth"
            return 1
        else
            echo "✅ EXCELLENT: $file"
            echo "   Lines: $lines | Size: ${size} bytes"
            echo "   → Excellent size - maintain current structure"
            return 0
        fi
    else
        echo "❓ NOT FOUND: $file"
        return -1
    fi
    echo ""
}

# Key files to analyze
files=(
    "app/page.tsx"
    "components/premium/MobileLandingDemo.tsx"
    "components/premium/PremiumInteractiveDemo.tsx"
    "components/static-nodes/static-switch-node.tsx"
    "components/static-nodes/inverter/InverterDisplay.tsx"
    "components/static-nodes/inverter/InverterSimulation.tsx"
    "components/animations/power-flow-animation.tsx"
    "components/animations/text/TypingTextAnimation.tsx"
    "components/layout/DesktopLayout.tsx"
    "components/layout/HeroSection.tsx"
    "components/layout/ContactSection.tsx"
)

echo "📊 ANALYZING KEY FILES..."
echo "========================="
echo ""

# Counters
critical_count=0
high_count=0
medium_count=0
good_count=0
excellent_count=0
total_files=0

# Analyze each file
for file in "${files[@]}"; do
    analyze_file "$file"
    result=$?
    
    case $result in
        4) critical_count=$((critical_count + 1)) ;;
        3) high_count=$((high_count + 1)) ;;
        2) medium_count=$((medium_count + 1)) ;;
        1) good_count=$((good_count + 1)) ;;
        0) excellent_count=$((excellent_count + 1)) ;;
    esac
    
    if [ $result -ge 0 ]; then
        total_files=$((total_files + 1))
    fi
done

echo "📈 PROJECT HEALTH SUMMARY"
echo "========================="
echo "Total files analyzed: $total_files"
echo "Critical files (500+): $critical_count"
echo "High priority (350-500): $high_count"
echo "Medium priority (250-350): $medium_count"
echo "Good files (150-250): $good_count"
echo "Excellent files (<150): $excellent_count"
echo ""

# Calculate overall score
total_score=0
if [ $total_files -gt 0 ]; then
    total_score=$(( (excellent_count * 100 + good_count * 80 + medium_count * 60 + high_count * 20 + critical_count * 0) / total_files ))
fi

echo "Overall Score: $total_score/100"

# Determine deployment readiness
if [ $critical_count -eq 0 ] && [ $high_count -le 1 ]; then
    echo "Deployment Ready: ✅ YES"
    deployment_ready=true
else
    echo "Deployment Ready: ❌ NO"
    deployment_ready=false
fi

echo ""
echo "🎯 IMMEDIATE ACTION PLAN"
echo "========================"

if [ $critical_count -gt 0 ]; then
    echo "🚨 CRITICAL PRIORITY - IMMEDIATE ACTION REQUIRED"
    echo "Timeline: 1-2 weeks of focused refactoring"
    echo ""
    echo "📋 EXECUTION STEPS:"
    echo "1. Create backup branch: git checkout -b refactor/critical-files"
    echo "2. Start with largest file first"
    echo "3. Break into 6-8 focused components"
    echo "4. Extract custom hooks for state management"
    echo "5. Test thoroughly after each extraction"
    echo "6. Commit frequently with descriptive messages"
    echo ""
    
elif [ $high_count -gt 0 ]; then
    echo "🔴 HIGH PRIORITY - REFACTORING RECOMMENDED"
    echo "Timeline: 4-8 hours of focused work"
    echo ""
    echo "📋 REFACTORING STRATEGY:"
    echo "1. Plan 2-hour focused sessions"
    echo "2. Extract 4-5 components per large file"
    echo "3. Create custom hooks for complex state"
    echo "4. Maintain single responsibility principle"
    echo "5. Test after each component extraction"
    echo ""
    
elif [ $medium_count -gt 0 ]; then
    echo "🟡 MEDIUM PRIORITY - OPTIMIZATION OPPORTUNITY"
    echo "Timeline: 2-4 hours of optimization"
    echo ""
    echo "📋 OPTIMIZATION STEPS:"
    echo "1. Extract 2-3 components from medium files"
    echo "2. Move utility functions to separate files"
    echo "3. Consider performance optimizations"
    echo "4. Monitor for continued growth"
    echo ""
    
else
    echo "🎉 EXCELLENT PROJECT HEALTH!"
    echo "✅ All files are optimally sized"
    echo "✅ Professional code organization"
    echo "✅ Ready for feature development"
    echo "✅ Deployment ready"
    echo ""
fi

echo "🚀 NEXT STEPS RECOMMENDATION"
echo "============================"

if [ "$deployment_ready" = true ]; then
    echo "🎉 CONGRATULATIONS! Your project is deployment-ready!"
    echo ""
    echo "Immediate Actions:"
    echo "1. 🚀 Set up deployment pipeline (Vercel/Netlify)"
    echo "2. 📱 Test responsive design on multiple devices"
    echo "3. 🌟 Deploy to staging environment"
    echo "4. 👥 Conduct user acceptance testing"
    echo "5. 🎯 Plan feature development roadmap"
    echo "6. 📊 Set up analytics and monitoring"
else
    echo "🛠️ OPTIMIZATION PHASE REQUIRED"
    echo ""
    echo "Priority Actions:"
    echo "1. 📋 Follow refactoring plans for large files"
    echo "2. 🧪 Test functionality after each extraction"
    echo "3. 📊 Re-run this analysis after refactoring"
    echo "4. 🚀 Deploy once optimization is complete"
    echo ""
    echo "🎯 REFACTORING FOCUS AREAS:"
    
    if [ $critical_count -gt 0 ] || [ $high_count -gt 0 ]; then
        echo ""
        echo "🔧 MobileLandingDemo.tsx (if large):"
        echo "   → Extract: MobileLoadingScreen, MobileHeader, MobileEnergySystem"
        echo "   → Create: useMobileLayout hook"
        echo "   → Target: Reduce to ~100 lines"
        echo ""
        echo "🔧 InverterDisplay.tsx (if large):"
        echo "   → Extract: InverterLCD, InverterControls, InverterStatus"
        echo "   → Create: useInverterState hook"
        echo "   → Target: Reduce to ~80 lines"
        echo ""
        echo "🔧 PowerFlowAnimation.tsx (if large):"
        echo "   → Extract: PowerFlowPath, PowerFlowParticles, PowerFlowControls"
        echo "   → Create: usePowerFlowAnimation hook"
        echo "   → Target: Reduce to ~120 lines"
    fi
fi

echo ""
echo "✅ ANALYSIS COMPLETE!"
echo "===================="
echo ""
echo "📞 NEED HELP?"
echo "============="
echo "If you need assistance with refactoring:"
echo "1. Share the specific file sizes found above"
echo "2. Ask for detailed component extraction guidance"
echo "3. Request step-by-step refactoring instructions"
echo ""
echo "🎯 Your GREAN WORLD project shows excellent organization!"
echo "   With any needed optimizations, you'll have a production-ready app!"

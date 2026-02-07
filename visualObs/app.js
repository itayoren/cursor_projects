// Value Meter Dashboard - Application Logic
// Mock data and chart configurations

// ============================================
// SOLUTION SECTION TOGGLE
// ============================================

const toggleSolution = () => {
  const content = document.getElementById('solution-content');
  const chevron = document.getElementById('solution-chevron');
  const toggle = document.getElementById('solution-toggle');
  
  if (content && chevron && toggle) {
    const isHidden = content.classList.contains('hidden');
    
    content.classList.toggle('hidden', !isHidden);
    chevron.classList.toggle('rotate-180', isHidden);
    toggle.setAttribute('aria-expanded', isHidden);
  }
};

// ============================================
// MAIN TAB NAVIGATION (PRD vs Prototype)
// ============================================

const initMainTabs = () => {
  const mainTabBtns = document.querySelectorAll('.main-tab-btn');
  const mainPanels = document.querySelectorAll('.main-panel');
  
  const handleMainTabClick = (e) => {
    const targetTab = e.currentTarget.dataset.mainTab;
    
    // Update buttons
    mainTabBtns.forEach(btn => {
      const isActive = btn.dataset.mainTab === targetTab;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive);
    });
    
    // Update panels
    mainPanels.forEach(panel => {
      const isTarget = panel.id === `${targetTab}-section`;
      panel.classList.toggle('hidden', !isTarget);
    });
    
    // Initialize charts when switching to prototype
    if (targetTab === 'prototype' && !window.chartsInitialized) {
      initAllCharts();
      window.chartsInitialized = true;
    }
    
    // Scroll to top when switching main tabs
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  mainTabBtns.forEach(btn => {
    btn.addEventListener('click', handleMainTabClick);
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleMainTabClick(e);
      }
    });
  });
};

// Helper function to switch to prototype tab
const switchToPrototype = () => {
  const prototypeBtn = document.querySelector('.main-tab-btn[data-main-tab="prototype"]');
  if (prototypeBtn) {
    prototypeBtn.click();
  }
};

// Make it available globally
window.switchToPrototype = switchToPrototype;

// ============================================
// STUDIO VIEW NAVIGATION (Agentforce Studio Sidebar)
// ============================================

const initStudioNav = () => {
  const navBtns = document.querySelectorAll('.studio-nav-btn');
  const views = document.querySelectorAll('.studio-view');
  
  const handleStudioNavClick = (e) => {
    const targetView = e.currentTarget.dataset.studioView;
    
    // Update nav buttons
    navBtns.forEach(btn => {
      const isActive = btn.dataset.studioView === targetView;
      btn.classList.toggle('active', isActive);
      btn.classList.toggle('bg-blue-50', isActive);
      btn.classList.toggle('text-blue-700', isActive);
      btn.classList.toggle('font-medium', isActive);
      btn.classList.toggle('text-gray-600', !isActive);
      btn.classList.toggle('hover:bg-gray-50', !isActive);
    });
    
    // Update views
    views.forEach(view => {
      const isTarget = view.id === `${targetView}-view`;
      view.classList.toggle('hidden', !isTarget);
    });
    
    // Initialize charts when switching to valuemeter view
    if (targetView === 'valuemeter' && !window.chartsInitialized) {
      initAllCharts();
      window.chartsInitialized = true;
    }
  };
  
  navBtns.forEach(btn => {
    btn.addEventListener('click', handleStudioNavClick);
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleStudioNavClick(e);
      }
    });
  });
};

// ============================================
// PRD SIDEBAR NAVIGATION
// ============================================

const initPrdNav = () => {
  const navBtns = document.querySelectorAll('.prd-nav-btn');
  const contentSections = document.querySelectorAll('.prd-content');
  
  const handleNavClick = (e) => {
    const targetSection = e.currentTarget.dataset.section;
    
    // Update nav buttons
    navBtns.forEach(btn => {
      const isActive = btn.dataset.section === targetSection;
      btn.classList.toggle('active', isActive);
    });
    
    // Update content sections
    contentSections.forEach(section => {
      const isTarget = section.id === `${targetSection}-section`;
      section.classList.toggle('hidden', !isTarget);
    });
    
    // Scroll to top of content (0 to show header)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  navBtns.forEach(btn => {
    btn.addEventListener('click', handleNavClick);
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleNavClick(e);
      }
    });
  });
};

// ============================================
// MOCK DATA
// ============================================

const mockData = {
  summary: {
    ftr: { value: 78.5, trend: 12.3, vsTraditional: 66.2 },
    accuracy: { value: 94.2, trend: 2.1 },
    escalation: { value: 8.7, trend: -3.2 },
    roi: { value: 284438, deflections: 1847, truckRollCost: 154 }
  },
  
  ftrComparison: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    sophie: [75.2, 76.8, 77.4, 78.5],
    traditional: [64.1, 65.3, 66.0, 66.2]
  },
  
  accuracyTrend: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [89.5, 90.2, 91.8, 92.4, 93.1, 94.2]
  },
  
  escalationTrend: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    values: [11.9, 10.5, 9.8, 8.7]
  },
  
  productResolution: {
    labels: ['Router X500', 'Modem M200', 'TV Box Pro', 'Smart Hub', 'Camera S1'],
    values: [92, 87, 78, 95, 84],
    sessions: [523, 412, 289, 345, 278]
  },
  
  sessions: [
    { id: 'VS-2847', device: 'Router X500', deviceVersion: 'v2.1', confidence: 0.97, resolution: 'Cable Reset', status: 'resolved', time: '2 min ago' },
    { id: 'VS-2846', device: 'Modem M200', deviceVersion: 'v1.8', confidence: 0.89, resolution: 'Firmware Update', status: 'resolved', time: '5 min ago' },
    { id: 'VS-2845', device: 'TV Box Pro', deviceVersion: 'v3.2', confidence: 0.62, resolution: 'Escalated to Agent', status: 'escalated', time: '8 min ago' },
    { id: 'VS-2844', device: 'Smart Hub', deviceVersion: 'v2.0', confidence: 0.95, resolution: 'Power Cycle', status: 'resolved', time: '12 min ago' },
    { id: 'VS-2843', device: 'Router X500', deviceVersion: 'v2.1', confidence: 0.91, resolution: 'WiFi Reset', status: 'resolved', time: '15 min ago' },
    { id: 'VS-2842', device: 'Camera S1', deviceVersion: 'v1.5', confidence: 0.45, resolution: 'Pending Review', status: 'pending', time: '18 min ago' },
    { id: 'VS-2841', device: 'Modem M200', deviceVersion: 'v1.8', confidence: 0.88, resolution: 'Port Forward Config', status: 'resolved', time: '22 min ago' },
  ],
  
  roiTrend: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [42000, 58000, 71000, 89000, 112000, 142000],
    cumulative: [42000, 100000, 171000, 260000, 372000, 514000]
  },
  
  issuesByProduct: {
    labels: ['Router X500', 'Modem M200', 'TV Box Pro', 'Smart Hub', 'Camera S1'],
    connectivity: [145, 89, 34, 56, 23],
    hardware: [23, 45, 78, 12, 67],
    software: [67, 34, 112, 89, 45]
  },
  
  issuesByRegion: {
    labels: ['Northeast', 'Southeast', 'Midwest', 'Southwest', 'West'],
    values: [324, 287, 198, 256, 312]
  },
  
  maintenanceData: [
    { product: 'Router X500', priceTier: 'Premium', maintenanceRate: '4.2%', avgResTime: '8 min', valueScore: 94 },
    { product: 'Modem M200', priceTier: 'Standard', maintenanceRate: '6.8%', avgResTime: '12 min', valueScore: 82 },
    { product: 'TV Box Pro', priceTier: 'Premium', maintenanceRate: '9.1%', avgResTime: '15 min', valueScore: 71 },
    { product: 'Smart Hub', priceTier: 'Premium', maintenanceRate: '3.5%', avgResTime: '6 min', valueScore: 96 },
    { product: 'Camera S1', priceTier: 'Standard', maintenanceRate: '7.4%', avgResTime: '11 min', valueScore: 78 },
  ],
  
  recommendations: [
    {
      type: 'warning',
      title: 'Visual accuracy low on TV Box Pro',
      description: 'TV Box Pro has 78% resolution rate, below the 85% threshold. Consider adding more training images for v3.2 hardware variants.',
      action: 'Upload Training Images',
      impact: 'Potential +7% resolution improvement'
    },
    {
      type: 'info',
      title: 'Trending issue detected',
      description: 'Router X500 connectivity issues increased 23% in the Northeast region over the past 3 days. Pattern suggests potential firmware bug.',
      action: 'Investigate Pattern',
      impact: '145 affected sessions'
    },
    {
      type: 'success',
      title: 'High performance on Smart Hub',
      description: 'Smart Hub achieving 95% resolution rate with highest customer satisfaction. Consider promoting this success in training materials.',
      action: 'Generate Report',
      impact: 'Best performing product'
    },
    {
      type: 'info',
      title: 'Model confidence improvement opportunity',
      description: 'Camera S1 sessions show 15% retry rate. Historical data suggests lighting condition variations. Recommend augmenting training data.',
      action: 'Review Sessions',
      impact: 'Potential 12% efficiency gain'
    }
  ],
  
  sustainability: {
    percentage: 80,
    co2Saved: 12.4,
    truckRollsAvoided: 1847,
    milesNotDriven: 46175
  },
  
  agentforce: {
    highConfidenceCount: 847,
    patternMatchCount: 23,
    crossRefCount: 156
  }
};

// ============================================
// CHART CONFIGURATIONS
// ============================================

const chartColors = {
  blue: '#0176D3',
  blueLight: '#1B96FF',
  success: '#2E844A',
  warning: '#DD7A01',
  error: '#BA0517',
  gray: '#706E6B',
  border: '#DDDBDA'
};

let charts = {};

const initFtrComparisonChart = () => {
  const ctx = document.getElementById('ftrComparisonChart').getContext('2d');
  charts.ftrComparison = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: mockData.ftrComparison.labels,
      datasets: [
        {
          label: 'Sophie Visual AI',
          data: mockData.ftrComparison.sophie,
          backgroundColor: chartColors.blue,
          borderRadius: 4
        },
        {
          label: 'Traditional',
          data: mockData.ftrComparison.traditional,
          backgroundColor: chartColors.gray,
          borderRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          align: 'end'
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          min: 50,
          max: 100,
          ticks: {
            callback: (value) => value + '%'
          }
        }
      }
    }
  });
};

const initAccuracyTrendChart = () => {
  const ctx = document.getElementById('accuracyTrendChart').getContext('2d');
  charts.accuracyTrend = new Chart(ctx, {
    type: 'line',
    data: {
      labels: mockData.accuracyTrend.labels,
      datasets: [{
        label: 'Visual Accuracy',
        data: mockData.accuracyTrend.values,
        borderColor: chartColors.success,
        backgroundColor: 'rgba(46, 132, 74, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: chartColors.success
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          min: 85,
          max: 100,
          ticks: {
            callback: (value) => value + '%'
          }
        }
      }
    }
  });
};

const initEscalationChart = () => {
  const ctx = document.getElementById('escalationChart').getContext('2d');
  charts.escalation = new Chart(ctx, {
    type: 'line',
    data: {
      labels: mockData.escalationTrend.labels,
      datasets: [{
        label: 'Escalation Rate',
        data: mockData.escalationTrend.values,
        borderColor: chartColors.warning,
        backgroundColor: 'rgba(221, 122, 1, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: chartColors.warning
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          min: 0,
          max: 20,
          ticks: {
            callback: (value) => value + '%'
          }
        }
      }
    }
  });
};

const initProductResolutionChart = () => {
  const ctx = document.getElementById('productResolutionChart').getContext('2d');
  charts.productResolution = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: mockData.productResolution.labels,
      datasets: [{
        label: 'Resolution Rate',
        data: mockData.productResolution.values,
        backgroundColor: mockData.productResolution.values.map(v => 
          v >= 90 ? chartColors.success : v >= 80 ? chartColors.warning : chartColors.error
        ),
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            afterLabel: (context) => {
              return `Sessions: ${mockData.productResolution.sessions[context.dataIndex]}`;
            }
          }
        }
      },
      scales: {
        x: {
          beginAtZero: false,
          min: 50,
          max: 100,
          ticks: {
            callback: (value) => value + '%'
          }
        }
      }
    }
  });
};

const initRoiTrendChart = () => {
  const ctx = document.getElementById('roiTrendChart').getContext('2d');
  charts.roiTrend = new Chart(ctx, {
    type: 'line',
    data: {
      labels: mockData.roiTrend.labels,
      datasets: [{
        label: 'Monthly Savings',
        data: mockData.roiTrend.values,
        borderColor: chartColors.blue,
        backgroundColor: 'rgba(1, 118, 211, 0.1)',
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => '$' + (value / 1000) + 'K'
          }
        }
      }
    }
  });
};

const initIssuesByProductChart = () => {
  const ctx = document.getElementById('issuesByProductChart').getContext('2d');
  charts.issuesByProduct = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: mockData.issuesByProduct.labels,
      datasets: [
        {
          label: 'Connectivity',
          data: mockData.issuesByProduct.connectivity,
          backgroundColor: chartColors.blue,
          borderRadius: 4
        },
        {
          label: 'Hardware',
          data: mockData.issuesByProduct.hardware,
          backgroundColor: chartColors.warning,
          borderRadius: 4
        },
        {
          label: 'Software',
          data: mockData.issuesByProduct.software,
          backgroundColor: chartColors.success,
          borderRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          align: 'end'
        }
      },
      scales: {
        x: {
          stacked: true
        },
        y: {
          stacked: true
        }
      }
    }
  });
};

const initIssuesByRegionChart = () => {
  const ctx = document.getElementById('issuesByRegionChart').getContext('2d');
  charts.issuesByRegion = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: mockData.issuesByRegion.labels,
      datasets: [{
        data: mockData.issuesByRegion.values,
        backgroundColor: [
          chartColors.blue,
          chartColors.blueLight,
          chartColors.success,
          chartColors.warning,
          chartColors.gray
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right'
        }
      }
    }
  });
};

// ============================================
// UI FUNCTIONS
// ============================================

const populateSessionsTable = () => {
  const tbody = document.getElementById('sessionsTableBody');
  tbody.innerHTML = mockData.sessions.map(session => {
    const confidenceClass = session.confidence >= 0.9 ? 'confidence-high' : 
                           session.confidence >= 0.7 ? 'confidence-medium' : 'confidence-low';
    const statusClass = `status-${session.status}`;
    
    return `
      <tr>
        <td class="px-4 py-3 font-medium text-sf-blue">${session.id}</td>
        <td class="px-4 py-3">
          <div>${session.device}</div>
          <div class="text-xs text-sf-gray">${session.deviceVersion}</div>
        </td>
        <td class="px-4 py-3 ${confidenceClass} font-medium">${(session.confidence * 100).toFixed(0)}%</td>
        <td class="px-4 py-3 text-sf-text">${session.resolution}</td>
        <td class="px-4 py-3">
          <span class="status-badge ${statusClass}">${session.status.charAt(0).toUpperCase() + session.status.slice(1)}</span>
        </td>
        <td class="px-4 py-3 text-sf-gray">${session.time}</td>
      </tr>
    `;
  }).join('');
};

const populateMaintenanceTable = () => {
  const tbody = document.getElementById('maintenanceTableBody');
  tbody.innerHTML = mockData.maintenanceData.map(item => {
    const scoreColor = item.valueScore >= 90 ? 'text-sf-success' : 
                      item.valueScore >= 75 ? 'text-sf-warning' : 'text-sf-error';
    
    return `
      <tr>
        <td class="px-4 py-3 font-medium text-sf-text">${item.product}</td>
        <td class="px-4 py-3">
          <span class="px-2 py-1 rounded-full text-xs font-medium ${item.priceTier === 'Premium' ? 'bg-sf-blue/10 text-sf-blue' : 'bg-sf-gray/10 text-sf-gray'}">
            ${item.priceTier}
          </span>
        </td>
        <td class="px-4 py-3 text-sf-text">${item.maintenanceRate}</td>
        <td class="px-4 py-3 text-sf-text">${item.avgResTime}</td>
        <td class="px-4 py-3 font-bold ${scoreColor}">${item.valueScore}</td>
      </tr>
    `;
  }).join('');
};

const populateRecommendations = () => {
  const container = document.getElementById('recommendationsList');
  container.innerHTML = mockData.recommendations.map(rec => {
    const iconMap = {
      warning: `<svg class="w-5 h-5 text-sf-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
      </svg>`,
      info: `<svg class="w-5 h-5 text-sf-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>`,
      success: `<svg class="w-5 h-5 text-sf-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>`,
      critical: `<svg class="w-5 h-5 text-sf-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>`
    };
    
    return `
      <div class="recommendation-card recommendation-${rec.type}">
        <div class="flex items-start gap-4">
          <div class="flex-shrink-0 mt-1">
            ${iconMap[rec.type]}
          </div>
          <div class="flex-grow">
            <h4 class="font-semibold text-sf-text">${rec.title}</h4>
            <p class="text-sf-gray text-sm mt-1">${rec.description}</p>
            <div class="flex items-center justify-between mt-3">
              <span class="text-xs text-sf-gray">${rec.impact}</span>
              <button 
                class="px-4 py-2 bg-sf-blue text-white text-sm font-medium rounded-lg hover:bg-sf-blue-dark transition-colors"
                tabindex="0"
                aria-label="${rec.action}"
              >
                ${rec.action}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
};

const updateSustainabilityMeter = () => {
  const ring = document.getElementById('sustainabilityRing');
  const circumference = 2 * Math.PI * 56;
  const offset = circumference - (mockData.sustainability.percentage / 100) * circumference;
  ring.style.strokeDashoffset = offset;
  
  document.getElementById('sustainabilityValue').textContent = mockData.sustainability.percentage + '%';
  document.getElementById('co2Saved').textContent = mockData.sustainability.co2Saved;
  document.getElementById('truckRollsAvoided').textContent = mockData.sustainability.truckRollsAvoided.toLocaleString();
  document.getElementById('milesNotDriven').textContent = mockData.sustainability.milesNotDriven.toLocaleString();
};

const updateAgentforceStats = () => {
  document.getElementById('highConfidenceCount').textContent = mockData.agentforce.highConfidenceCount.toLocaleString();
  document.getElementById('patternMatchCount').textContent = mockData.agentforce.patternMatchCount;
  document.getElementById('crossRefCount').textContent = mockData.agentforce.crossRefCount;
};

// ============================================
// ROI CALCULATOR
// ============================================

const calculateROI = () => {
  const costInput = document.getElementById('truckRollCost');
  const cost = parseFloat(costInput.value) || 154;
  const deflections = mockData.summary.roi.deflections;
  const totalSavings = deflections * cost;
  
  document.getElementById('deflectionsValue').textContent = deflections.toLocaleString();
  document.getElementById('totalSavings').textContent = '$' + totalSavings.toLocaleString();
  document.getElementById('roiValue').textContent = '$' + Math.round(totalSavings / 1000) + 'K';
};

// ============================================
// TAB NAVIGATION
// ============================================

const initTabs = () => {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  
  const handleTabClick = (e) => {
    const targetTab = e.currentTarget.dataset.tab;
    
    // Update buttons
    tabBtns.forEach(btn => {
      const isActive = btn.dataset.tab === targetTab;
      btn.classList.toggle('active', isActive);
      btn.classList.toggle('border-sf-blue', isActive);
      btn.classList.toggle('text-sf-blue', isActive);
      btn.classList.toggle('border-transparent', !isActive);
      btn.classList.toggle('text-sf-gray', !isActive);
      btn.setAttribute('aria-selected', isActive);
    });
    
    // Update panels
    tabPanels.forEach(panel => {
      const isTarget = panel.id === `${targetTab}-panel`;
      panel.classList.toggle('hidden', !isTarget);
    });
  };
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', handleTabClick);
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleTabClick(e);
      }
    });
  });
};

// ============================================
// REFRESH FUNCTIONALITY
// ============================================

const handleRefresh = () => {
  const refreshBtn = document.getElementById('refreshBtn');
  refreshBtn.classList.add('animate-spin');
  
  // Simulate data refresh
  setTimeout(() => {
    refreshBtn.classList.remove('animate-spin');
    document.getElementById('lastRefresh').textContent = 'just now';
    
    // Add visual feedback
    document.querySelectorAll('.bg-sf-card').forEach(card => {
      card.classList.add('value-updated');
      setTimeout(() => card.classList.remove('value-updated'), 500);
    });
  }, 1000);
};

// ============================================
// DATE RANGE HANDLER
// ============================================

const handleDateRangeChange = (e) => {
  const range = e.target.value;
  console.log('Date range changed to:', range);
  
  // In a real app, this would fetch new data based on the selected range
  // For now, just show visual feedback
  document.getElementById('lastRefresh').textContent = 'updating...';
  setTimeout(() => {
    document.getElementById('lastRefresh').textContent = 'just now';
  }, 500);
};

// ============================================
// CHART INITIALIZATION WRAPPER
// ============================================

const initAllCharts = () => {
  // Initialize charts
  initFtrComparisonChart();
  initAccuracyTrendChart();
  initEscalationChart();
  initProductResolutionChart();
  initRoiTrendChart();
  initIssuesByProductChart();
  initIssuesByRegionChart();
  
  // Populate tables and lists
  populateSessionsTable();
  populateMaintenanceTable();
  populateRecommendations();
  
  // Update other components
  updateSustainabilityMeter();
  updateAgentforceStats();
  calculateROI();
  
  // Initialize dashboard tab navigation
  initTabs();
  
  // Event listeners for dashboard
  const refreshBtn = document.getElementById('refreshBtn');
  const dateRange = document.getElementById('dateRange');
  const truckRollCost = document.getElementById('truckRollCost');
  
  if (refreshBtn) refreshBtn.addEventListener('click', handleRefresh);
  if (dateRange) dateRange.addEventListener('change', handleDateRangeChange);
  if (truckRollCost) truckRollCost.addEventListener('input', calculateROI);
};

// ============================================
// INITIALIZATION
// ============================================

const init = () => {
  // Initialize main navigation (PRD vs Prototype)
  initMainTabs();
  
  // Initialize PRD sidebar navigation
  initPrdNav();
  
  // Initialize Studio view navigation (Agentforce Studio sidebar)
  initStudioNav();
  
  // Flag to track if charts have been initialized
  window.chartsInitialized = false;
  
  // Update last refresh time periodically
  setInterval(() => {
    const lastRefresh = document.getElementById('lastRefresh');
    if (lastRefresh && lastRefresh.textContent !== 'just now' && lastRefresh.textContent !== 'updating...') {
      const current = parseInt(lastRefresh.textContent) || 2;
      lastRefresh.textContent = `${current + 1} minutes ago`;
    }
  }, 60000);
};

// Run initialization when DOM is ready
document.addEventListener('DOMContentLoaded', init);

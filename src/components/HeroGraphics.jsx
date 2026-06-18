import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button, Tabs, Tab, Paper, alpha, IconButton } from '@mui/material';
import { Engineering, LocalShipping, Hub, TrendingUp, PlayArrow, Refresh } from '@mui/icons-material';

// Custom CSS-in-JS animations
const glowPulse = {
  '@keyframes glow': {
    '0%, 100%': { opacity: 0.6, transform: 'scale(1)' },
    '50%': { opacity: 0.9, transform: 'scale(1.05)' },
  }
};

const typingBlink = {
  '@keyframes blink': {
    '50%': { borderColor: 'transparent' },
  }
};

const HeroGraphics = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [logs, setLogs] = useState([]);
  const [truckPositions, setTruckPositions] = useState([
    { id: 1, x: 50, y: 80, targetIndex: 1, path: [{ x: 50, y: 80 }, { x: 120, y: 90 }, { x: 180, y: 50 }] },
    { id: 2, x: 220, y: 140, targetIndex: 1, path: [{ x: 220, y: 140 }, { x: 150, y: 120 }, { x: 90, y: 170 }] },
    { id: 3, x: 100, y: 50, targetIndex: 1, path: [{ x: 100, y: 50 }, { x: 170, y: 80 }, { x: 250, y: 110 }] }
  ]);
  const timerRef = useRef(null);

  // Tab definitions
  const tabs = [
    { label: 'Site Intel', icon: <Engineering />, title: 'Construction Intelligence' },
    { label: 'Fleet Systems', icon: <LocalShipping />, title: 'Logistics & Fleet Dispatch' },
    { label: 'Collab Hub', icon: <Hub />, title: 'Enterprise Collaboration' },
    { label: 'BI Analytics', icon: <TrendingUp />, title: 'Predictive Analytics' },
  ];

  // Autoplay functionality
  useEffect(() => {
    if (autoPlay) {
      timerRef.current = setInterval(() => {
        setActiveTab((prev) => (prev + 1) % tabs.length);
      }, 6000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoPlay]);

  // Log simulation for widgets
  useEffect(() => {
    // Generate initial logs based on active tab
    const initialLogs = {
      0: [
        'SYSTEM: Initializing Correspondence Parser...',
        'OCR: Scanning SEC_4_BOQ.pdf [100%]',
        'AI: Matching line item 48 with slippage S-Curve',
        'DATABASE: Syncing progress log [Site Makindu]',
        'STATUS: Ingestion complete. Progress computed at 94.2%'
      ],
      1: [
        'DISPATCH: Dispatcher console ready. Scanning GPS...',
        'FLEET: Truck 08 status: IN_TRANSIT (Mombasa Route)',
        'GPS: Coordinates matching checkpoint Voi: [3.39S, 38.56E]',
        'FLEET: Truck 12 delay flagged (15m traffic at Athi River)',
        'TELEMETRY: Real-time driver metrics synced'
      ],
      2: [
        'COLLAB: Loading enterprise coordination mesh...',
        'HUB: Connection established with DevCollab core',
        'ACTIVITY: Collaborator Dennis approved PR #124',
        'STATUS: Resource integration portal online',
        'ALERT: 3 tasks pending BOQ analysis validation'
      ],
      3: [
        'BI: Fetching quarterly operational budget statistics...',
        'MODEL: Recalculating project slippage deviation...',
        'DATA: Target cost vs Actual cost S-curve generated',
        'METRIC: Slippage margin = -0.4 days (Optimal)',
        'FORECAST: Q4 logistics efficiency rating predicted at 96.2%'
      ],
    };

    setLogs(initialLogs[activeTab] || []);

    // Setup minor ticker intervals for additional logging
    const interval = setInterval(() => {
      const extraLogs = {
        0: [
          `AI: Scanned progress log log_${Math.floor(Math.random()*1000)}.json`,
          `CORRESPONDENCE: Match rate at ${90 + Math.floor(Math.random()*10)}%`,
          'AI: Re-evaluating cost impact coordinates...'
        ],
        1: [
          `GPS: Truck 0${Math.floor(Math.random()*9) + 1} updated coords`,
          `FLEET: Idle time alert cleared for Truck 1${Math.floor(Math.random()*5)}`,
          'DISPATCH: Optimized route assigned for dispatch 244'
        ],
        2: [
          `GIT: Merged branch feature/boq-auth to main`,
          `ALERT: Sync completed for team dashboard`,
          `HUB: Unified communication socket connection ping: 14ms`
        ],
        3: [
          `BI: S-Curve variance margin updated to ${0.05 + (Math.random()*0.1).toFixed(3)}%`,
          `COMPUTE: Revenue prediction baseline calculated`,
          `METRICS: Efficiency target lock established`
        ]
      };

      const pool = extraLogs[activeTab];
      const selected = pool[Math.floor(Math.random() * pool.length)];
      setLogs(prev => [...prev.slice(1), selected]);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeTab]);

  // Truck position animation simulator
  useEffect(() => {
    if (activeTab !== 1) return;

    const animInterval = setInterval(() => {
      setTruckPositions(prev =>
        prev.map(truck => {
          const nextTargetIdx = truck.targetIndex;
          const target = truck.path[nextTargetIdx];
          
          // Calculate movement
          const dx = target.x - truck.x;
          const dy = target.y - truck.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 3) {
            // Pick next path node
            const nextIdx = (nextTargetIdx + 1) % truck.path.length;
            return {
              ...truck,
              x: truck.path[nextTargetIdx].x,
              y: truck.path[nextTargetIdx].y,
              targetIndex: nextIdx
            };
          } else {
            // Step towards target
            const speed = 1.2;
            return {
              ...truck,
              x: truck.x + (dx / dist) * speed,
              y: truck.y + (dy / dist) * speed
            };
          }
        })
      );
    }, 50);

    return () => clearInterval(animInterval);
  }, [activeTab]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setAutoPlay(false); // Stop autoplay once user interacts
  };

  const resetAutoPlay = () => {
    setAutoPlay(true);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '650px', mx: 'auto', position: 'relative', zIndex: 10 }}>
      {/* Decorative Gradient Background Glows */}
      <Box
        sx={{
          position: 'absolute',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(0, 242, 254, 0.15) 0%, rgba(156, 39, 176, 0.08) 50%, transparent 100%)',
          top: '-10%',
          right: '-10%',
          filter: 'blur(45px)',
          zIndex: -1,
          pointerEvents: 'none'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: '280px',
          height: '280px',
          background: 'radial-gradient(circle, rgba(156, 39, 176, 0.15) 0%, rgba(0, 242, 254, 0.05) 50%, transparent 100%)',
          bottom: '-15%',
          left: '-10%',
          filter: 'blur(40px)',
          zIndex: -1,
          pointerEvents: 'none'
        }}
      />

      {/* Main Terminal Frame */}
      <Paper
        elevation={0}
        sx={{
          background: 'rgba(11, 14, 31, 0.55)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.09)',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 40px rgba(0, 242, 254, 0.04)',
          transition: 'all 0.4s ease',
          '&:hover': {
            borderColor: 'rgba(0, 242, 254, 0.25)',
            boxShadow: '0 30px 60px -10px rgba(0, 0, 0, 0.7), 0 0 50px rgba(0, 242, 254, 0.08)',
          }
        }}
      >
        {/* Terminal Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 3,
            py: 2,
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            background: 'rgba(7, 9, 19, 0.4)'
          }}
        >
          {/* OS Dot controls */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#FF5F56' }} />
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#FFBD2E' }} />
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#27C93F' }} />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                bgcolor: autoPlay ? '#00F2FE' : '#9C27B0',
                boxShadow: `0 0 10px ${autoPlay ? '#00F2FE' : '#9C27B0'}`,
                animation: 'glow 2s infinite ease-in-out',
                ...glowPulse
              }}
            />
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 600,
                letterSpacing: '0.1em',
                fontSize: '0.75rem'
              }}
            >
              {autoPlay ? 'TELEMETRY RUNNING' : 'USER CONTROLLING'}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            {!autoPlay && (
              <IconButton
                onClick={resetAutoPlay}
                size="small"
                sx={{ color: '#00F2FE', p: 0.2, '&:hover': { bgcolor: 'rgba(0,242,254,0.1)' } }}
                title="Autoplay dashboard animations"
              >
                <PlayArrow fontSize="small" />
              </IconButton>
            )}
          </Box>
        </Box>

        {/* Tab Controls Bar */}
        <Box sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', background: 'rgba(7, 9, 19, 0.2)' }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
            sx={{
              minHeight: '48px',
              '& .MuiTabs-indicator': {
                background: 'linear-gradient(90deg, #00F2FE 0%, #9C27B0 100%)',
                height: '3px',
              },
              '& .MuiTab-root': {
                color: 'text.secondary',
                fontFamily: 'Lexend, sans-serif',
                fontSize: { xs: '0.7rem', sm: '0.85rem' },
                fontWeight: 600,
                textTransform: 'none',
                minHeight: '48px',
                py: 1,
                px: 1.5,
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'row',
                gap: 1,
                '&.Mui-selected': {
                  color: '#00F2FE',
                  background: 'rgba(0, 242, 254, 0.03)',
                },
                '&:hover': {
                  color: '#fff',
                  background: 'rgba(255, 255, 255, 0.02)',
                }
              }
            }}
          >
            {tabs.map((tab, idx) => (
              <Tab
                key={idx}
                label={tab.label}
                icon={tab.icon}
                iconPosition="start"
                sx={{ '& .MuiSvgIcon-root': { fontSize: { xs: 16, sm: 18 } } }}
              />
            ))}
          </Tabs>
        </Box>

        {/* Terminal Body Console Workspace */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr' }, height: { xs: 'auto', sm: '320px' } }}>
          
          {/* Main Visual Display (Left) */}
          <Box
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              borderRight: { xs: 'none', md: '1px solid rgba(255, 255, 255, 0.06)' },
              borderBottom: { xs: '1px solid rgba(255, 255, 255, 0.06)', md: 'none' },
              minHeight: '220px',
              background: 'rgba(7, 9, 19, 0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Tech grid overlay inside visual screen */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
                backgroundSize: '15px 15px',
                pointerEvents: 'none'
              }}
            />

            {/* Content Switcher */}
            {activeTab === 0 && (
              // Mode 0: Construction Site Intelligence
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
                {/* Visual Circle Meter */}
                <Box sx={{ position: 'relative', width: 130, height: 130, mb: 2 }}>
                  <svg width="130" height="130" style={{ transform: 'rotate(-90deg)' }}>
                    <circle
                      cx="65"
                      cy="65"
                      r="52"
                      fill="transparent"
                      stroke="rgba(255, 255, 255, 0.05)"
                      strokeWidth="8"
                    />
                    <circle
                      cx="65"
                      cy="65"
                      r="52"
                      fill="transparent"
                      stroke="url(#cyanPurpleGrad)"
                      strokeWidth="8"
                      strokeDasharray="326.7"
                      strokeDashoffset="18.9" // ~94% Progress
                      style={{
                        transition: 'stroke-dashoffset 2s ease-in-out',
                        filter: 'drop-shadow(0 0 6px rgba(0, 242, 254, 0.5))'
                      }}
                    />
                    <defs>
                      <linearGradient id="cyanPurpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00F2FE" />
                        <stop offset="100%" stopColor="#9C27B0" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="h5" sx={{ color: '#fff', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>
                      94.2%
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#00F2FE', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.05em' }}>
                      DOC AGGREGATION
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ color: '#fff', fontWeight: 700, fontFamily: 'Lexend, sans-serif', fontSize: '0.9rem', mb: 0.5 }}>
                  Makindu Site Registry
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Box sx={{ px: 1, py: 0.3, bgcolor: 'rgba(0, 242, 254, 0.08)', border: '1px solid rgba(0, 242, 254, 0.2)', borderRadius: '4px' }}>
                    <Typography sx={{ color: '#00F2FE', fontSize: '0.65rem', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>
                      BOQ CONNECTED
                    </Typography>
                  </Box>
                  <Box sx={{ px: 1, py: 0.3, bgcolor: 'rgba(230, 126, 34, 0.08)', border: '1px solid rgba(230, 126, 34, 0.2)', borderRadius: '4px' }}>
                    <Typography sx={{ color: '#E67E22', fontSize: '0.65rem', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>
                      SLIPPAGE: 0.0d
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}

            {activeTab === 1 && (
              // Mode 1: Logistics & Fleet Dispatch Map
              <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', zIndex: 1, position: 'relative' }}>
                <Typography variant="caption" sx={{ color: '#00F2FE', fontFamily: 'Lexend, sans-serif', fontWeight: 700, mb: 1, alignSelf: 'flex-start' }}>
                  FLEET DISPATCH COORDINATE MAP
                </Typography>
                <Box
                  sx={{
                    flexGrow: 1,
                    width: '100%',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '8px',
                    position: 'relative',
                    background: 'rgba(7, 9, 19, 0.4)',
                    overflow: 'hidden'
                  }}
                >
                  {/* SVG Route lines */}
                  <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
                    {/* Grid mesh backdrop */}
                    <defs>
                      <pattern id="fleetGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="1"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#fleetGrid)" />

                    {/* Route 1 */}
                    <path
                      d="M 50,80 Q 120,90 180,50"
                      fill="none"
                      stroke="rgba(0, 242, 254, 0.15)"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                    {/* Route 2 */}
                    <path
                      d="M 220,140 Q 150,120 90,170"
                      fill="none"
                      stroke="rgba(156, 39, 176, 0.15)"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                    {/* Route 3 */}
                    <path
                      d="M 100,50 Q 170,80 250,110"
                      fill="none"
                      stroke="rgba(0, 242, 254, 0.15)"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />

                    {/* Checkpoints */}
                    <circle cx="50" cy="80" r="4" fill="#00F2FE" />
                    <circle cx="180" cy="50" r="4" fill="#00F2FE" />
                    <circle cx="220" cy="140" r="4" fill="#9C27B0" />
                    <circle cx="90" cy="170" r="4" fill="#9C27B0" />
                  </svg>

                  {/* Dispatch Truck Nodes */}
                  {truckPositions.map(truck => (
                    <Box
                      key={truck.id}
                      sx={{
                        position: 'absolute',
                        left: truck.x - 6,
                        top: truck.y - 6,
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        bgcolor: truck.id % 2 === 0 ? '#9C27B0' : '#00F2FE',
                        boxShadow: `0 0 10px ${truck.id % 2 === 0 ? '#9C27B0' : '#00F2FE'}`,
                        border: '2px solid #fff',
                        transition: 'left 0.05s linear, top 0.05s linear',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: '#fff' }} />
                    </Box>
                  ))}

                  {/* Telemetry Indicator */}
                  <Box sx={{ position: 'absolute', bottom: 6, right: 8, px: 1, py: 0.2, bgcolor: 'rgba(7,9,19,0.7)', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <Typography sx={{ color: 'text.secondary', fontSize: '0.6rem', fontFamily: 'monospace' }}>
                      ACTIVE FLT: 3
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}

            {activeTab === 2 && (
              // Mode 2: Collaboration Mesh Network
              <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', zIndex: 1, position: 'relative' }}>
                <Typography variant="caption" sx={{ color: '#9C27B0', fontFamily: 'Lexend, sans-serif', fontWeight: 700, mb: 1, alignSelf: 'flex-start' }}>
                  ENTERPRISE RESOURCE INTEGRATION MESH
                </Typography>
                <Box
                  sx={{
                    flexGrow: 1,
                    width: '100%',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '8px',
                    position: 'relative',
                    background: 'rgba(7, 9, 19, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}
                >
                  <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
                    {/* Node Connection Lines */}
                    <line x1="50" y1="50" x2="140" y2="100" stroke="#00F2FE" strokeWidth="1.5" strokeOpacity="0.4" />
                    <line x1="230" y1="50" x2="140" y2="100" stroke="#9C27B0" strokeWidth="1.5" strokeOpacity="0.4" />
                    <line x1="50" y1="150" x2="140" y2="100" stroke="#9C27B0" strokeWidth="1.5" strokeOpacity="0.4" />
                    <line x1="230" y1="150" x2="140" y2="100" stroke="#00F2FE" strokeWidth="1.5" strokeOpacity="0.4" />
                    <line x1="50" y1="50" x2="50" y2="150" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    <line x1="230" y1="50" x2="230" y2="150" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  </svg>

                  {/* Center Node (Core Platform Hub) */}
                  <Box
                    sx={{
                      position: 'absolute',
                      left: 'calc(50% - 22px)',
                      top: 'calc(50% - 22px)',
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #00F2FE 0%, #9C27B0 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 0 15px rgba(0, 242, 254, 0.4)',
                      border: '2px solid rgba(255,255,255,0.2)',
                      zIndex: 3
                    }}
                  >
                    <Typography sx={{ color: '#fff', fontSize: '0.75rem', fontWeight: 800 }}>HUB</Typography>
                  </Box>

                  {/* Satellite Nodes */}
                  <Box sx={{ position: 'absolute', left: 30, top: 30, width: 32, height: 32, borderRadius: '50%', bgcolor: '#0F1225', border: '1px solid #00F2FE', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                    <Typography sx={{ color: '#00F2FE', fontSize: '0.6rem', fontWeight: 700 }}>BOQ</Typography>
                  </Box>
                  <Box sx={{ position: 'absolute', right: 30, top: 30, width: 32, height: 32, borderRadius: '50%', bgcolor: '#0F1225', border: '1px solid #9C27B0', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                    <Typography sx={{ color: '#9C27B0', fontSize: '0.6rem', fontWeight: 700 }}>GPS</Typography>
                  </Box>
                  <Box sx={{ position: 'absolute', left: 30, bottom: 30, width: 32, height: 32, borderRadius: '50%', bgcolor: '#0F1225', border: '1px solid #9C27B0', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                    <Typography sx={{ color: '#9C27B0', fontSize: '0.6rem', fontWeight: 700 }}>AUTH</Typography>
                  </Box>
                  <Box sx={{ position: 'absolute', right: 30, bottom: 30, width: 32, height: 32, borderRadius: '50%', bgcolor: '#0F1225', border: '1px solid #00F2FE', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                    <Typography sx={{ color: '#00F2FE', fontSize: '0.6rem', fontWeight: 700 }}>REP</Typography>
                  </Box>
                </Box>
              </Box>
            )}

            {activeTab === 3 && (
              // Mode 3: Analytics Glowing S-Curve Chart
              <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', zIndex: 1, position: 'relative' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="caption" sx={{ color: '#00F2FE', fontFamily: 'Lexend, sans-serif', fontWeight: 700 }}>
                    S-CURVE VALUE ANALYSIS
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: 'monospace', fontSize: '0.6rem' }}>
                    Q3 Target vs Actual
                  </Typography>
                </Box>

                <Box
                  sx={{
                    flexGrow: 1,
                    width: '100%',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '8px',
                    position: 'relative',
                    background: 'rgba(7, 9, 19, 0.4)',
                    p: 1.5,
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {/* Glowing SVG S-Curve Chart */}
                  <svg width="100%" height="80%" viewBox="0 0 260 120" style={{ overflow: 'visible' }}>
                    {/* Grids */}
                    <line x1="0" y1="20" x2="260" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                    <line x1="0" y1="60" x2="260" y2="60" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                    <line x1="0" y1="100" x2="260" y2="100" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

                    {/* S-curve Target line (cyan) */}
                    <path
                      d="M 0,110 C 80,105 100,50 180,30 T 260,10"
                      fill="none"
                      stroke="#00F2FE"
                      strokeWidth="2.5"
                      style={{ filter: 'drop-shadow(0 0 4px rgba(0, 242, 254, 0.3))' }}
                    />

                    {/* S-curve Actual line (purple) */}
                    <path
                      d="M 0,110 C 60,110 90,65 170,35 T 230,20"
                      fill="none"
                      stroke="#9C27B0"
                      strokeWidth="2.5"
                      strokeDasharray="4 2"
                      style={{ filter: 'drop-shadow(0 0 4px rgba(156, 39, 176, 0.3))' }}
                    />

                    {/* Current Hover Telemetry Coordinate */}
                    <g transform="translate(170, 35)">
                      <circle r="4" fill="#9C27B0" stroke="#fff" strokeWidth="1.5" />
                      <line y1="0" y2="85" stroke="rgba(156,39,176,0.3)" strokeWidth="1" strokeDasharray="2 2" />
                    </g>
                    <g transform="translate(180, 30)">
                      <circle r="4" fill="#00F2FE" stroke="#fff" strokeWidth="1.5" />
                    </g>
                  </svg>

                  {/* Mini KPI Dashboard */}
                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mt: 1, pt: 1, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <Box>
                      <Typography sx={{ color: 'text.secondary', fontSize: '0.55rem', textTransform: 'uppercase' }}>Current Variance</Typography>
                      <Typography sx={{ color: '#00F2FE', fontSize: '0.8rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>-0.4 Days</Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ color: 'text.secondary', fontSize: '0.55rem', textTransform: 'uppercase' }}>Efficiency Index</Typography>
                      <Typography sx={{ color: '#9C27B0', fontSize: '0.8rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>96.2%</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>

          {/* Telemetry Logs Panel (Right) */}
          <Box
            sx={{
              p: 3,
              background: 'rgba(7, 9, 19, 0.35)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '200px'
            }}
          >
            {/* Sector Widget Description */}
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: '#fff',
                  fontWeight: 700,
                  fontFamily: 'Lexend, sans-serif',
                  fontSize: '0.95rem',
                  mb: 0.5
                }}
              >
                {tabs[activeTab].title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.8rem',
                  lineHeight: 1.4,
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                {activeTab === 0 && 'Document AI scans correspondence files, contracts, and registers to automatically populate slippage alerts.'}
                {activeTab === 1 && 'Real-time GPS nodes map route progression coordinates to track operational delays and logistics efficiency.'}
                {activeTab === 2 && 'Fully integrated secure digital mesh linking authentication, progress reports, and dispatcher alerts.'}
                {activeTab === 3 && 'Predictive calculation frameworks plotting work execution S-curves and comparing schedule variances.'}
              </Typography>
            </Box>

            {/* Live Console Output */}
            <Box>
              <Typography
                variant="caption"
                sx={{
                  color: '#00F2FE',
                  fontWeight: 700,
                  fontFamily: 'monospace',
                  letterSpacing: '0.05em',
                  display: 'block',
                  mb: 1,
                  fontSize: '0.7rem'
                }}
              >
                LIVE MONITORING LOGS:
              </Typography>

              {/* Log stream box */}
              <Box
                sx={{
                  p: 1.5,
                  bgcolor: 'rgba(7, 9, 19, 0.6)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: '6px',
                  fontFamily: 'monospace',
                  minHeight: '110px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.5
                }}
              >
                {logs.map((log, index) => {
                  let logColor = '#A0AEC0'; // default soft grey
                  if (log.startsWith('SYSTEM:') || log.startsWith('ALERT:')) {
                    logColor = '#E67E22'; // warm orange
                  } else if (log.startsWith('AI:') || log.startsWith('GPS:') || log.startsWith('STATUS:') || log.startsWith('DISPATCH:')) {
                    logColor = '#00F2FE'; // cyan
                  } else if (log.startsWith('COLLAB:') || log.startsWith('BI:') || log.startsWith('HUB:')) {
                    logColor = '#9C27B0'; // purple
                  }

                  return (
                    <Typography
                      key={index}
                      sx={{
                        color: logColor,
                        fontSize: '0.65rem',
                        lineHeight: 1.3,
                        wordBreak: 'break-all',
                        whiteSpace: 'pre-wrap'
                      }}
                    >
                      {log}
                    </Typography>
                  );
                })}
                {/* Typing Cursor indicator */}
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                  <Box
                    sx={{
                      width: 5,
                      height: 10,
                      bgcolor: '#00F2FE',
                      animation: 'blink 1s step-end infinite',
                      borderLeft: '1px solid #00F2FE',
                      ...typingBlink
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>

        </Box>
      </Paper>
    </Box>
  );
};

export default HeroGraphics;

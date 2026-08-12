import fs from 'fs';
import path from 'path';

const outputDir = path.resolve('public/assets/products');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. Electric 2-Wheeler Battery Pack (Clean, authentic, zero fabricated text)
// ─────────────────────────────────────────────────────────────────────────────
const svg2W = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <!-- Background studio glow -->
    <radialGradient id="bgGlow2W" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="60%" stop-color="#F8FAFC"/>
      <stop offset="100%" stop-color="#EDF2F7"/>
    </radialGradient>
    
    <!-- Floor Shadow -->
    <radialGradient id="floorShadow2W" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="rgba(15,23,42,0.20)"/>
      <stop offset="40%" stop-color="rgba(15,23,42,0.08)"/>
      <stop offset="100%" stop-color="rgba(15,23,42,0)"/>
    </radialGradient>

    <!-- Metal Casing Gradient (White/Light Grey Powder-Coat) -->
    <linearGradient id="bodyGrad2W" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#E2E8F0"/>
      <stop offset="15%" stop-color="#F8FAFC"/>
      <stop offset="70%" stop-color="#FFFFFF"/>
      <stop offset="95%" stop-color="#E2E8F0"/>
      <stop offset="100%" stop-color="#CBD5E1"/>
    </linearGradient>

    <linearGradient id="topLidGrad2W" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="50%" stop-color="#F1F5F9"/>
      <stop offset="100%" stop-color="#E2E8F0"/>
    </linearGradient>

    <linearGradient id="handleMetal2W" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#64748B"/>
      <stop offset="30%" stop-color="#94A3B8"/>
      <stop offset="70%" stop-color="#475569"/>
      <stop offset="100%" stop-color="#334155"/>
    </linearGradient>

    <linearGradient id="rubberGrip2W" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B"/>
      <stop offset="50%" stop-color="#0F172A"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
  </defs>

  <!-- Background Canvas -->
  <rect width="800" height="600" fill="url(#bgGlow2W)" />

  <!-- Floor Shadow -->
  <ellipse cx="400" cy="510" rx="260" ry="28" fill="url(#floorShadow2W)" />

  <!-- MAIN BATTERY PACK HOUSING -->
  <g transform="translate(180, 110)">
    
    <!-- Outer Metal Body -->
    <rect x="50" y="110" width="340" height="340" rx="12" fill="url(#bodyGrad2W)" stroke="#CBD5E1" stroke-width="2" />
    
    <!-- Front Recessed Panel Bevel -->
    <rect x="70" y="130" width="300" height="300" rx="8" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" />

    <!-- Sheet Metal Seams -->
    <line x1="50" y1="140" x2="390" y2="140" stroke="#CBD5E1" stroke-width="1.5" />
    <line x1="50" y1="420" x2="390" y2="420" stroke="#CBD5E1" stroke-width="1.5" />
    
    <!-- Fastener Screws (Allen Hex) -->
    <circle cx="62" cy="125" r="4" fill="#94A3B8" stroke="#475569" stroke-width="1"/>
    <circle cx="378" cy="125" r="4" fill="#94A3B8" stroke="#475569" stroke-width="1"/>
    <circle cx="62" cy="435" r="4" fill="#94A3B8" stroke="#475569" stroke-width="1"/>
    <circle cx="378" cy="435" r="4" fill="#94A3B8" stroke="#475569" stroke-width="1"/>

    <!-- TOP LID HOUSING (Angle Bevel) -->
    <path d="M 40,110 L 80,60 L 360,60 L 400,110 Z" fill="url(#topLidGrad2W)" stroke="#CBD5E1" stroke-width="2" />
    
    <!-- Top Lid Screws -->
    <circle cx="95" cy="72" r="3.5" fill="#94A3B8" stroke="#475569" stroke-width="1"/>
    <circle cx="345" cy="72" r="3.5" fill="#94A3B8" stroke="#475569" stroke-width="1"/>
    <circle cx="220" cy="68" r="3.5" fill="#94A3B8" stroke="#475569" stroke-width="1"/>

    <!-- TOP CARRYING HANDLE -->
    <!-- Handle Hinges -->
    <rect x="140" y="50" width="16" height="16" rx="3" fill="url(#handleMetal2W)" stroke="#334155" stroke-width="1"/>
    <rect x="284" y="50" width="16" height="16" rx="3" fill="url(#handleMetal2W)" stroke="#334155" stroke-width="1"/>
    <!-- Steel Arch -->
    <path d="M 148,52 L 148,16 Q 148,6 158,6 L 282,6 Q 292,6 292,16 L 292,52" fill="none" stroke="url(#handleMetal2W)" stroke-width="12" stroke-linecap="round" />
    <!-- Rubber Center Grip -->
    <rect x="175" y="0" width="90" height="12" rx="4" fill="url(#rubberGrip2W)" stroke="#0F172A" stroke-width="1"/>
    <!-- Grip ribs -->
    <line x1="195" y1="2" x2="195" y2="10" stroke="#334155" stroke-width="1.5" />
    <line x1="210" y1="2" x2="210" y2="10" stroke="#334155" stroke-width="1.5" />
    <line x1="225" y1="2" x2="225" y2="10" stroke="#334155" stroke-width="1.5" />
    <line x1="240" y1="2" x2="240" y2="10" stroke="#334155" stroke-width="1.5" />

    <!-- TOP DISCHARGE & CHARGING CONNECTORS -->
    <!-- Chogori / Main Power Connector (Round Waterproof) -->
    <g transform="translate(100, 75)">
      <circle cx="15" cy="15" r="14" fill="#1E293B" stroke="#0F172A" stroke-width="2"/>
      <circle cx="15" cy="15" r="10" fill="#0F172A" stroke="#059669" stroke-width="1.5"/>
      <!-- Pin Holes -->
      <circle cx="11" cy="12" r="2" fill="#CA8A04" />
      <circle cx="19" cy="12" r="2" fill="#CA8A04" />
      <circle cx="11" cy="18" r="1.5" fill="#E2E8F0" />
      <circle cx="15" cy="19" r="1.5" fill="#E2E8F0" />
      <circle cx="19" cy="18" r="1.5" fill="#E2E8F0" />
    </g>

    <!-- Side Power Switch & 4-LED SOC Meter -->
    <g transform="translate(290, 75)">
      <circle cx="15" cy="15" r="11" fill="#334155" stroke="#1E293B" stroke-width="1.5"/>
      <circle cx="15" cy="15" r="8" fill="#0F172A" stroke="#059669" stroke-width="1.5"/>
      <rect x="35" y="11" width="36" height="8" rx="3" fill="#0F172A" />
      <circle cx="41" cy="15" r="1.8" fill="#10B981" />
      <circle cx="47" cy="15" r="1.8" fill="#10B981" />
      <circle cx="53" cy="15" r="1.8" fill="#10B981" />
      <circle cx="59" cy="15" r="1.8" fill="#10B981" />
    </g>

    <!-- AUTHENTIC MEHAR SCREENPRINTED BRANDING (No unverified specifications) -->
    <g transform="translate(90, 200)">
      <rect x="0" y="0" width="260" height="80" rx="6" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1" />
      <rect x="16" y="16" width="4" height="48" rx="2" fill="#059669" />
      <text x="32" y="44" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="900" fill="#0F172A" letter-spacing="1">ME<tspan fill="#059669">H</tspan>AR</text>
      <text x="32" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="700" fill="#059669" letter-spacing="2">THE NAME YOU TRUST</text>
    </g>

    <!-- Bottom Mounting Flanges with Bolt Slots -->
    <path d="M 30,440 L 50,440 L 50,450 L 30,450 Z" fill="#94A3B8" stroke="#475569" stroke-width="1" />
    <path d="M 390,440 L 410,440 L 410,450 L 390,450 Z" fill="#94A3B8" stroke="#475569" stroke-width="1" />
    <ellipse cx="38" cy="445" rx="3" ry="1.5" fill="#475569" />
    <ellipse cx="402" cy="445" rx="3" ry="1.5" fill="#475569" />

    <!-- Side Heat Sink / Ventilation Fins (Clean physical slots) -->
    <g transform="translate(110, 320)">
      <line x1="0" y1="0" x2="220" y2="0" stroke="#CBD5E1" stroke-width="2" stroke-linecap="round"/>
      <line x1="0" y1="16" x2="220" y2="16" stroke="#CBD5E1" stroke-width="2" stroke-linecap="round"/>
      <line x1="0" y1="32" x2="220" y2="32" stroke="#CBD5E1" stroke-width="2" stroke-linecap="round"/>
      <line x1="0" y1="48" x2="220" y2="48" stroke="#CBD5E1" stroke-width="2" stroke-linecap="round"/>
      <line x1="0" y1="64" x2="220" y2="64" stroke="#CBD5E1" stroke-width="2" stroke-linecap="round"/>
    </g>

  </g>
</svg>`;

// ─────────────────────────────────────────────────────────────────────────────
// 2. Electric 3-Wheeler Battery Pack (Heavy Duty Commercial Sheet Metal)
// ─────────────────────────────────────────────────────────────────────────────
const svg3W = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <radialGradient id="bgGlow3W" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="60%" stop-color="#F8FAFC"/>
      <stop offset="100%" stop-color="#EDF2F7"/>
    </radialGradient>
    
    <radialGradient id="floorShadow3W" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="rgba(15,23,42,0.22)"/>
      <stop offset="45%" stop-color="rgba(15,23,42,0.10)"/>
      <stop offset="100%" stop-color="rgba(15,23,42,0)"/>
    </radialGradient>

    <linearGradient id="heavyBody3W" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#CBD5E1"/>
      <stop offset="10%" stop-color="#F1F5F9"/>
      <stop offset="60%" stop-color="#FFFFFF"/>
      <stop offset="90%" stop-color="#E2E8F0"/>
      <stop offset="100%" stop-color="#94A3B8"/>
    </linearGradient>

    <linearGradient id="steelHandle3W" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#94A3B8"/>
      <stop offset="50%" stop-color="#475569"/>
      <stop offset="100%" stop-color="#1E293B"/>
    </linearGradient>
  </defs>

  <rect width="800" height="600" fill="url(#bgGlow3W)" />
  <ellipse cx="400" cy="515" rx="300" ry="32" fill="url(#floorShadow3W)" />

  <g transform="translate(130, 130)">
    <!-- Main Heavy Duty Enclosure -->
    <rect x="50" y="80" width="440" height="290" rx="8" fill="url(#heavyBody3W)" stroke="#94A3B8" stroke-width="2.5" />
    
    <!-- Top Lid with Overhang Lip -->
    <rect x="40" y="55" width="460" height="30" rx="4" fill="#F8FAFC" stroke="#64748B" stroke-width="2" />
    
    <!-- Heavy Corner Rivets & Screws -->
    <circle cx="55" cy="70" r="4" fill="#64748B" stroke="#1E293B" stroke-width="1"/>
    <circle cx="160" cy="70" r="4" fill="#64748B" stroke="#1E293B" stroke-width="1"/>
    <circle cx="380" cy="70" r="4" fill="#64748B" stroke="#1E293B" stroke-width="1"/>
    <circle cx="485" cy="70" r="4" fill="#64748B" stroke="#1E293B" stroke-width="1"/>

    <!-- Dual Heavy Side Stamped Steel Lifting Handles -->
    <g transform="translate(15, 170)">
      <rect x="0" y="0" width="25" height="70" rx="4" fill="url(#steelHandle3W)" stroke="#0F172A" stroke-width="1.5" />
      <rect x="4" y="15" width="8" height="40" rx="3" fill="#F1F5F9" />
      <circle cx="12" cy="8" r="2.5" fill="#475569"/>
      <circle cx="12" cy="62" r="2.5" fill="#475569"/>
    </g>
    <g transform="translate(500, 170)">
      <rect x="0" y="0" width="25" height="70" rx="4" fill="url(#steelHandle3W)" stroke="#0F172A" stroke-width="1.5" />
      <rect x="13" y="15" width="8" height="40" rx="3" fill="#F1F5F9" />
      <circle cx="12" cy="8" r="2.5" fill="#475569"/>
      <circle cx="12" cy="62" r="2.5" fill="#475569"/>
    </g>

    <!-- Top Heavy Post Terminals with Protective Color Boots -->
    <!-- Positive Terminal (Red) -->
    <g transform="translate(110, 15)">
      <rect x="0" y="15" width="40" height="25" rx="4" fill="#DC2626" stroke="#991B1B" stroke-width="1.5" />
      <circle cx="20" cy="15" r="14" fill="#EF4444" stroke="#991B1B" stroke-width="1.5" />
      <rect x="15" y="0" width="10" height="15" fill="#CA8A04" stroke="#854D0E" stroke-width="1" />
      <text x="16" y="27" font-family="monospace" font-size="14" font-weight="900" fill="#FFFFFF">+</text>
    </g>
    <!-- Negative Terminal (Black) -->
    <g transform="translate(390, 15)">
      <rect x="0" y="15" width="40" height="25" rx="4" fill="#1E293B" stroke="#0F172A" stroke-width="1.5" />
      <circle cx="20" cy="15" r="14" fill="#334155" stroke="#0F172A" stroke-width="1.5" />
      <rect x="15" y="0" width="10" height="15" fill="#94A3B8" stroke="#475569" stroke-width="1" />
      <text x="17" y="26" font-family="monospace" font-size="14" font-weight="900" fill="#FFFFFF">-</text>
    </g>

    <!-- Center Anderson SB120 High-Current Traction Connector -->
    <g transform="translate(240, 20)">
      <rect x="0" y="10" width="60" height="30" rx="4" fill="#0284C7" stroke="#0369A1" stroke-width="1.5" />
      <circle cx="18" cy="25" r="6" fill="#CA8A04" />
      <circle cx="42" cy="25" r="6" fill="#CA8A04" />
    </g>

    <!-- AUTHENTIC MEHAR BRANDING -->
    <g transform="translate(85, 130)">
      <rect x="0" y="0" width="370" height="100" rx="6" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1" />
      <rect x="20" y="20" width="5" height="60" rx="2.5" fill="#059669" />
      <text x="36" y="52" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="36" font-weight="900" fill="#0F172A" letter-spacing="1">ME<tspan fill="#059669">H</tspan>AR</text>
      <text x="36" y="70" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#059669" letter-spacing="2">THE NAME YOU TRUST</text>
    </g>

    <!-- Side Louvers -->
    <g transform="translate(85, 260)">
      <rect x="0" y="0" width="370" height="80" rx="4" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="1"/>
      <line x1="20" y1="20" x2="350" y2="20" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>
      <line x1="20" y1="40" x2="350" y2="40" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>
      <line x1="20" y1="60" x2="350" y2="60" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>
    </g>

    <!-- Heavy-Duty Bottom Flange with 4 Mounting Holes -->
    <rect x="30" y="370" width="480" height="14" rx="3" fill="#64748B" stroke="#334155" stroke-width="1.5" />
    <ellipse cx="60" cy="377" rx="8" ry="3" fill="#1E293B" />
    <ellipse cx="180" cy="377" rx="8" ry="3" fill="#1E293B" />
    <ellipse cx="360" cy="377" rx="8" ry="3" fill="#1E293B" />
    <ellipse cx="480" cy="377" rx="8" ry="3" fill="#1E293B" />
  </g>
</svg>`;

// ─────────────────────────────────────────────────────────────────────────────
// 3. Cylindrical Li-Ion Cells (100% Clean Metallic Steel Body - NO FAKE TEXT)
// ─────────────────────────────────────────────────────────────────────────────
const svgCylindrical = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <radialGradient id="bgGlowCyl" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="60%" stop-color="#F8FAFC"/>
      <stop offset="100%" stop-color="#EDF2F7"/>
    </radialGradient>
    
    <radialGradient id="floorShadowCyl" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="rgba(15,23,42,0.20)"/>
      <stop offset="50%" stop-color="rgba(15,23,42,0.06)"/>
      <stop offset="100%" stop-color="rgba(15,23,42,0)"/>
    </radialGradient>

    <!-- Clean Industrial Steel Can (No text, pure metallic reflection) -->
    <linearGradient id="steelCanClean" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#64748B"/>
      <stop offset="18%" stop-color="#CBD5E1"/>
      <stop offset="42%" stop-color="#FFFFFF"/>
      <stop offset="70%" stop-color="#E2E8F0"/>
      <stop offset="88%" stop-color="#94A3B8"/>
      <stop offset="100%" stop-color="#475569"/>
    </linearGradient>

    <linearGradient id="topButtonClean" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#94A3B8"/>
      <stop offset="50%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#64748B"/>
    </linearGradient>

    <linearGradient id="nickelStripClean" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#94A3B8"/>
      <stop offset="50%" stop-color="#F1F5F9"/>
      <stop offset="100%" stop-color="#64748B"/>
    </linearGradient>
  </defs>

  <rect width="800" height="600" fill="url(#bgGlowCyl)" />
  <ellipse cx="400" cy="520" rx="280" ry="26" fill="url(#floorShadowCyl)" />

  <!-- GROUP 1: Individual Standing Cylindrical Cells (Left) -->
  <g transform="translate(120, 140)">
    <!-- Cell 1 -->
    <g transform="translate(0, 40)">
      <rect x="0" y="30" width="70" height="280" rx="6" fill="url(#steelCanClean)" stroke="#475569" stroke-width="1.5"/>
      <ellipse cx="35" cy="30" rx="35" ry="10" fill="#CBD5E1" stroke="#475569" stroke-width="1.5"/>
      <ellipse cx="35" cy="27" rx="28" ry="7" fill="#059669" stroke="#047857" stroke-width="1"/>
      <rect x="23" y="10" width="24" height="16" rx="4" fill="url(#topButtonClean)" stroke="#475569" stroke-width="1.5"/>
      <ellipse cx="35" cy="10" rx="12" ry="4" fill="#FFFFFF" stroke="#475569" stroke-width="1"/>
      <ellipse cx="35" cy="310" rx="35" ry="8" fill="#475569" />
    </g>

    <!-- Cell 2 -->
    <g transform="translate(85, 0)">
      <rect x="0" y="30" width="70" height="320" rx="6" fill="url(#steelCanClean)" stroke="#475569" stroke-width="1.5"/>
      <ellipse cx="35" cy="30" rx="35" ry="10" fill="#CBD5E1" stroke="#475569" stroke-width="1.5"/>
      <ellipse cx="35" cy="27" rx="28" ry="7" fill="#059669" stroke="#047857" stroke-width="1"/>
      <rect x="23" y="10" width="24" height="16" rx="4" fill="url(#topButtonClean)" stroke="#475569" stroke-width="1.5"/>
      <ellipse cx="35" cy="10" rx="12" ry="4" fill="#FFFFFF" stroke="#475569" stroke-width="1"/>
      <ellipse cx="35" cy="350" rx="35" ry="8" fill="#475569" />
    </g>
  </g>

  <!-- GROUP 2: Spot-Welded Cell Matrix Array with Nickel Busbars (Right) -->
  <g transform="translate(360, 130)">
    
    <!-- Cell Matrix Row 1 (Back) -->
    <g transform="translate(40, 20)">
      <rect x="0" y="30" width="65" height="290" rx="6" fill="url(#steelCanClean)" stroke="#475569" stroke-width="1.5"/>
      <ellipse cx="32.5" cy="30" rx="32.5" ry="9" fill="#CBD5E1"/>
      <ellipse cx="32.5" cy="27" rx="25" ry="6" fill="#059669"/>
      
      <rect x="75" y="30" width="65" height="290" rx="6" fill="url(#steelCanClean)" stroke="#475569" stroke-width="1.5"/>
      <ellipse cx="107.5" cy="30" rx="32.5" ry="9" fill="#CBD5E1"/>
      <ellipse cx="107.5" cy="27" rx="25" ry="6" fill="#059669"/>
      
      <rect x="150" y="30" width="65" height="290" rx="6" fill="url(#steelCanClean)" stroke="#475569" stroke-width="1.5"/>
      <ellipse cx="182.5" cy="30" rx="32.5" ry="9" fill="#CBD5E1"/>
      <ellipse cx="182.5" cy="27" rx="25" ry="6" fill="#059669"/>
    </g>

    <!-- Cell Matrix Row 2 (Front) -->
    <g transform="translate(0, 60)">
      <rect x="0" y="30" width="65" height="290" rx="6" fill="url(#steelCanClean)" stroke="#475569" stroke-width="1.5"/>
      <ellipse cx="32.5" cy="30" rx="32.5" ry="9" fill="#CBD5E1"/>
      <ellipse cx="32.5" cy="27" rx="25" ry="6" fill="#059669"/>
      <rect x="21" y="10" width="23" height="16" rx="4" fill="url(#topButtonClean)" stroke="#475569" stroke-width="1.5"/>
      
      <rect x="75" y="30" width="65" height="290" rx="6" fill="url(#steelCanClean)" stroke="#475569" stroke-width="1.5"/>
      <ellipse cx="107.5" cy="30" rx="32.5" ry="9" fill="#CBD5E1"/>
      <ellipse cx="107.5" cy="27" rx="25" ry="6" fill="#059669"/>
      <rect x="96" y="10" width="23" height="16" rx="4" fill="url(#topButtonClean)" stroke="#475569" stroke-width="1.5"/>

      <rect x="150" y="30" width="65" height="290" rx="6" fill="url(#steelCanClean)" stroke="#475569" stroke-width="1.5"/>
      <ellipse cx="182.5" cy="30" rx="32.5" ry="9" fill="#CBD5E1"/>
      <ellipse cx="182.5" cy="27" rx="25" ry="6" fill="#059669"/>
      <rect x="171" y="10" width="23" height="16" rx="4" fill="url(#topButtonClean)" stroke="#475569" stroke-width="1.5"/>

      <!-- TOP STAMPED NICKEL STRIP BUSBAR -->
      <path d="M 20,8 L 195,8 Q 205,8 205,18 L 205,20 Q 205,25 195,25 L 20,25 Q 10,25 10,20 L 10,18 Q 10,8 20,8 Z" fill="url(#nickelStripClean)" stroke="#475569" stroke-width="1.5"/>
      
      <!-- 4 Precision Spot-Welds per Cell -->
      <circle cx="28" cy="14" r="1.5" fill="#1E293B"/>
      <circle cx="36" cy="14" r="1.5" fill="#1E293B"/>
      <circle cx="28" cy="20" r="1.5" fill="#1E293B"/>
      <circle cx="36" cy="20" r="1.5" fill="#1E293B"/>
      
      <circle cx="103" cy="14" r="1.5" fill="#1E293B"/>
      <circle cx="111" cy="14" r="1.5" fill="#1E293B"/>
      <circle cx="103" cy="20" r="1.5" fill="#1E293B"/>
      <circle cx="111" cy="20" r="1.5" fill="#1E293B"/>
      
      <circle cx="178" cy="14" r="1.5" fill="#1E293B"/>
      <circle cx="186" cy="14" r="1.5" fill="#1E293B"/>
      <circle cx="178" cy="20" r="1.5" fill="#1E293B"/>
      <circle cx="186" cy="20" r="1.5" fill="#1E293B"/>
    </g>
  </g>
</svg>`;

// ─────────────────────────────────────────────────────────────────────────────
// 4. Prismatic Li-Ion Cells (100% Clean Large-Format Rectangular Cells - NO FAKE TEXT)
// ─────────────────────────────────────────────────────────────────────────────
const svgPrismatic = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <radialGradient id="bgGlowPris" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="60%" stop-color="#F8FAFC"/>
      <stop offset="100%" stop-color="#EDF2F7"/>
    </radialGradient>
    
    <radialGradient id="floorShadowPris" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="rgba(15,23,42,0.20)"/>
      <stop offset="50%" stop-color="rgba(15,23,42,0.08)"/>
      <stop offset="100%" stop-color="rgba(15,23,42,0)"/>
    </radialGradient>

    <!-- Blue Polymer Wrap (Clean, solid industrial surface) -->
    <linearGradient id="blueWrapClean" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0284C7"/>
      <stop offset="50%" stop-color="#0EA5E9"/>
      <stop offset="100%" stop-color="#0369A1"/>
    </linearGradient>

    <!-- Top Laser Welded Aluminum Cover -->
    <linearGradient id="topAlumClean" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="50%" stop-color="#E2E8F0"/>
      <stop offset="100%" stop-color="#CBD5E1"/>
    </linearGradient>
  </defs>

  <rect width="800" height="600" fill="url(#bgGlowPris)" />
  <ellipse cx="400" cy="510" rx="300" ry="28" fill="url(#floorShadowPris)" />

  <g transform="translate(130, 130)">
    <!-- 4 Stacked Large-Format Prismatic Cells (Clean blue wrap, polar terminals, pressure vent) -->
    
    <!-- Cell 1 -->
    <g transform="translate(0, 40)">
      <rect x="0" y="40" width="110" height="300" rx="6" fill="url(#blueWrapClean)" stroke="#0369A1" stroke-width="1.5" />
      <rect x="0" y="20" width="110" height="24" rx="3" fill="url(#topAlumClean)" stroke="#64748B" stroke-width="1.5" />
      <!-- Positive Terminal (Red Ring) -->
      <circle cx="25" cy="32" r="9" fill="#EF4444" stroke="#991B1B" stroke-width="1"/>
      <circle cx="25" cy="32" r="5" fill="#CBD5E1" stroke="#475569" stroke-width="1"/>
      <!-- Safety Pressure Relief Vent -->
      <circle cx="55" cy="32" r="6" fill="#94A3B8" stroke="#475569" stroke-width="1"/>
      <!-- Negative Terminal (Black Ring) -->
      <circle cx="85" cy="32" r="9" fill="#1E293B" stroke="#0F172A" stroke-width="1"/>
      <circle cx="85" cy="32" r="5" fill="#CBD5E1" stroke="#475569" stroke-width="1"/>
    </g>

    <!-- Cell 2 -->
    <g transform="translate(125, 40)">
      <rect x="0" y="40" width="110" height="300" rx="6" fill="url(#blueWrapClean)" stroke="#0369A1" stroke-width="1.5" />
      <rect x="0" y="20" width="110" height="24" rx="3" fill="url(#topAlumClean)" stroke="#64748B" stroke-width="1.5" />
      <circle cx="25" cy="32" r="9" fill="#1E293B" stroke="#0F172A" stroke-width="1"/>
      <circle cx="25" cy="32" r="5" fill="#CBD5E1" stroke="#475569" stroke-width="1"/>
      <circle cx="55" cy="32" r="6" fill="#94A3B8" stroke="#475569" stroke-width="1"/>
      <circle cx="85" cy="32" r="9" fill="#EF4444" stroke="#991B1B" stroke-width="1"/>
      <circle cx="85" cy="32" r="5" fill="#CBD5E1" stroke="#475569" stroke-width="1"/>
    </g>

    <!-- Cell 3 -->
    <g transform="translate(250, 40)">
      <rect x="0" y="40" width="110" height="300" rx="6" fill="url(#blueWrapClean)" stroke="#0369A1" stroke-width="1.5" />
      <rect x="0" y="20" width="110" height="24" rx="3" fill="url(#topAlumClean)" stroke="#64748B" stroke-width="1.5" />
      <circle cx="25" cy="32" r="9" fill="#EF4444" stroke="#991B1B" stroke-width="1"/>
      <circle cx="25" cy="32" r="5" fill="#CBD5E1" stroke="#475569" stroke-width="1"/>
      <circle cx="55" cy="32" r="6" fill="#94A3B8" stroke="#475569" stroke-width="1"/>
      <circle cx="85" cy="32" r="9" fill="#1E293B" stroke="#0F172A" stroke-width="1"/>
      <circle cx="85" cy="32" r="5" fill="#CBD5E1" stroke="#475569" stroke-width="1"/>
    </g>

    <!-- Cell 4 -->
    <g transform="translate(375, 40)">
      <rect x="0" y="40" width="110" height="300" rx="6" fill="url(#blueWrapClean)" stroke="#0369A1" stroke-width="1.5" />
      <rect x="0" y="20" width="110" height="24" rx="3" fill="url(#topAlumClean)" stroke="#64748B" stroke-width="1.5" />
      <circle cx="25" cy="32" r="9" fill="#1E293B" stroke="#0F172A" stroke-width="1"/>
      <circle cx="25" cy="32" r="5" fill="#CBD5E1" stroke="#475569" stroke-width="1"/>
      <circle cx="55" cy="32" r="6" fill="#94A3B8" stroke="#475569" stroke-width="1"/>
      <circle cx="85" cy="32" r="9" fill="#EF4444" stroke="#991B1B" stroke-width="1"/>
      <circle cx="85" cy="32" r="5" fill="#CBD5E1" stroke="#475569" stroke-width="1"/>
    </g>

    <!-- Heavy Copper Inter-Cell Busbars -->
    <rect x="80" y="47" width="75" height="10" rx="3" fill="#CA8A04" stroke="#854D0E" stroke-width="1" />
    <circle cx="85" cy="52" r="3" fill="#1E293B" />
    <circle cx="150" cy="52" r="3" fill="#1E293B" />

    <rect x="205" y="47" width="75" height="10" rx="3" fill="#CA8A04" stroke="#854D0E" stroke-width="1" />
    <circle cx="210" cy="52" r="3" fill="#1E293B" />
    <circle cx="275" cy="52" r="3" fill="#1E293B" />

    <rect x="330" y="47" width="75" height="10" rx="3" fill="#CA8A04" stroke="#854D0E" stroke-width="1" />
    <circle cx="335" cy="52" r="3" fill="#1E293B" />
    <circle cx="400" cy="52" r="3" fill="#1E293B" />
  </g>
</svg>`;

// ─────────────────────────────────────────────────────────────────────────────
// 5. Stationary Energy Storage (ESS / Solar / Inverter Wall & Rack Enclosure)
// ─────────────────────────────────────────────────────────────────────────────
const svgESS = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <radialGradient id="bgGlowESS" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="60%" stop-color="#F8FAFC"/>
      <stop offset="100%" stop-color="#EDF2F7"/>
    </radialGradient>
    
    <radialGradient id="floorShadowESS" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="rgba(15,23,42,0.20)"/>
      <stop offset="50%" stop-color="rgba(15,23,42,0.06)"/>
      <stop offset="100%" stop-color="rgba(15,23,42,0)"/>
    </radialGradient>

    <linearGradient id="essBodyClean" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#E2E8F0"/>
      <stop offset="15%" stop-color="#F8FAFC"/>
      <stop offset="75%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#CBD5E1"/>
    </linearGradient>
  </defs>

  <rect width="800" height="600" fill="url(#bgGlowESS)" />
  <ellipse cx="400" cy="520" rx="260" ry="24" fill="url(#floorShadowESS)" />

  <g transform="translate(170, 90)">
    <!-- Main Wall/Rack Mount Cabinet Housing -->
    <rect x="30" y="30" width="400" height="390" rx="10" fill="url(#essBodyClean)" stroke="#CBD5E1" stroke-width="2"/>
    
    <circle cx="45" cy="45" r="4" fill="#94A3B8" stroke="#475569" stroke-width="1"/>
    <circle cx="415" cy="45" r="4" fill="#94A3B8" stroke="#475569" stroke-width="1"/>
    <circle cx="45" cy="405" r="4" fill="#94A3B8" stroke="#475569" stroke-width="1"/>
    <circle cx="415" cy="405" r="4" fill="#94A3B8" stroke="#475569" stroke-width="1"/>

    <!-- Front Recessed Bevel Panel -->
    <rect x="50" y="55" width="360" height="340" rx="8" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5"/>

    <!-- Front MEHAR Clean Label -->
    <g transform="translate(75, 80)">
      <rect x="0" y="0" width="4" height="42" rx="2" fill="#059669"/>
      <text x="16" y="28" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="26" font-weight="900" fill="#0F172A" letter-spacing="1">ME<tspan fill="#059669">H</tspan>AR</text>
      <text x="16" y="42" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="700" fill="#059669" letter-spacing="2">THE NAME YOU TRUST</text>
    </g>

    <!-- Real Commercial 2-Pole DC Miniature Circuit Breaker (MCB) Switch -->
    <g transform="translate(300, 75)">
      <rect x="0" y="0" width="85" height="50" rx="4" fill="#F1F5F9" stroke="#94A3B8" stroke-width="1.5"/>
      <rect x="10" y="10" width="28" height="30" rx="2" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1"/>
      <rect x="45" y="10" width="28" height="30" rx="2" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1"/>
      <rect x="15" y="12" width="18" height="14" rx="2" fill="#EA580C" />
      <rect x="50" y="12" width="18" height="14" rx="2" fill="#EA580C" />
    </g>

    <!-- Communication Ports: Dual RJ45 -->
    <g transform="translate(75, 145)">
      <rect x="0" y="0" width="310" height="40" rx="4" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1"/>
      <rect x="15" y="10" width="20" height="20" rx="2" fill="#1E293B" stroke="#0F172A" stroke-width="1"/>
      <text x="40" y="24" font-family="monospace" font-size="8" font-weight="bold" fill="#334155">CAN</text>
      <rect x="110" y="10" width="20" height="20" rx="2" fill="#1E293B" stroke="#0F172A" stroke-width="1"/>
      <text x="135" y="24" font-family="monospace" font-size="8" font-weight="bold" fill="#334155">RS485</text>
      <circle cx="260" cy="20" r="6" fill="#CA8A04" stroke="#854D0E" stroke-width="1"/>
      <text x="272" y="23" font-family="monospace" font-size="8" font-weight="bold" fill="#334155">GND</text>
    </g>

    <!-- High-Current DC Terminal Connection Bay (M8 Studs) -->
    <g transform="translate(75, 205)">
      <rect x="0" y="0" width="310" height="60" rx="4" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1"/>
      <rect x="25" y="12" width="35" height="35" rx="4" fill="#DC2626" />
      <circle cx="42.5" cy="29.5" r="7" fill="#CA8A04" stroke="#FFFFFF" stroke-width="1.5"/>
      <text x="70" y="34" font-family="monospace" font-size="11" font-weight="bold" fill="#991B1B">BAT +</text>
      
      <rect x="175" y="12" width="35" height="35" rx="4" fill="#1E293B" />
      <circle cx="192.5" cy="29.5" r="7" fill="#CA8A04" stroke="#FFFFFF" stroke-width="1.5"/>
      <text x="220" y="34" font-family="monospace" font-size="11" font-weight="bold" fill="#0F172A">BAT -</text>
    </g>

    <!-- Side Cooling Louvers (Laser Slotted) -->
    <g transform="translate(75, 290)">
      <line x1="0" y1="0" x2="310" y2="0" stroke="#CBD5E1" stroke-width="2" stroke-linecap="round"/>
      <line x1="0" y1="14" x2="310" y2="14" stroke="#CBD5E1" stroke-width="2" stroke-linecap="round"/>
      <line x1="0" y1="28" x2="310" y2="28" stroke="#CBD5E1" stroke-width="2" stroke-linecap="round"/>
      <line x1="0" y1="42" x2="310" y2="42" stroke="#CBD5E1" stroke-width="2" stroke-linecap="round"/>
      <line x1="0" y1="56" x2="310" y2="56" stroke="#CBD5E1" stroke-width="2" stroke-linecap="round"/>
      <line x1="0" y1="70" x2="310" y2="70" stroke="#CBD5E1" stroke-width="2" stroke-linecap="round"/>
    </g>

    <!-- Wall Mounting Tabs on Sides -->
    <path d="M 10,80 L 30,80 L 30,130 L 10,130 Z" fill="#94A3B8" stroke="#475569" stroke-width="1.5" />
    <circle cx="20" cy="105" r="4" fill="#334155" />
    <path d="M 430,80 L 450,80 L 450,130 L 430,130 Z" fill="#94A3B8" stroke="#475569" stroke-width="1.5" />
    <circle cx="440" cy="105" r="4" fill="#334155" />
  </g>
</svg>`;

// ─────────────────────────────────────────────────────────────────────────────
// 6. Exploded Engineering View (Authentic Structural Hierarchy - NO FAKE TEXT)
// ─────────────────────────────────────────────────────────────────────────────
const svgExploded = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <radialGradient id="bgGlowExp" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="60%" stop-color="#F8FAFC"/>
      <stop offset="100%" stop-color="#EDF2F7"/>
    </radialGradient>
    
    <radialGradient id="floorShadowExp" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="rgba(15,23,42,0.20)"/>
      <stop offset="50%" stop-color="rgba(15,23,42,0.06)"/>
      <stop offset="100%" stop-color="rgba(15,23,42,0)"/>
    </radialGradient>

    <linearGradient id="layerTopClean" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#E2E8F0"/>
      <stop offset="50%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#CBD5E1"/>
    </linearGradient>

    <!-- Green FR4 PCB Board Gradient -->
    <linearGradient id="pcbGreenClean" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#064E3B"/>
      <stop offset="50%" stop-color="#047857"/>
      <stop offset="100%" stop-color="#065F46"/>
    </linearGradient>
  </defs>

  <rect width="800" height="600" fill="url(#bgGlowExp)" />
  <ellipse cx="400" cy="540" rx="270" ry="22" fill="url(#floorShadowExp)" />

  <!-- ── LAYER 1: TOP SHEET-METAL LID WITH HANDLE (Lifted Up) ───────────────── -->
  <g transform="translate(180, 45)">
    <path d="M 30,50 L 70,10 L 370,10 L 410,50 Z" fill="url(#layerTopClean)" stroke="#94A3B8" stroke-width="1.5"/>
    <path d="M 170,15 L 170,-5 Q 170,-15 180,-15 L 260,-15 Q 270,-15 270,-5 L 270,15" fill="none" stroke="#64748B" stroke-width="8" stroke-linecap="round"/>
    <rect x="195" y="-20" width="50" height="10" rx="3" fill="#1E293B"/>
    <circle cx="85" cy="20" r="3" fill="#94A3B8" stroke="#475569" stroke-width="1"/>
    <circle cx="355" cy="20" r="3" fill="#94A3B8" stroke="#475569" stroke-width="1"/>
    <rect x="150" y="24" width="140" height="20" rx="3" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1"/>
    <text x="165" y="38" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="10" font-weight="900" fill="#0F172A">ME<tspan fill="#059669">H</tspan>AR</text>
    <text x="210" y="37" font-family="monospace" font-size="7" font-weight="bold" fill="#059669">TOP CASING</text>
  </g>

  <!-- Exploded Guide Lines -->
  <line x1="220" y1="95" x2="220" y2="150" stroke="#059669" stroke-width="1.5" stroke-dasharray="4,4"/>
  <line x1="580" y1="95" x2="580" y2="150" stroke="#059669" stroke-width="1.5" stroke-dasharray="4,4"/>

  <!-- ── LAYER 2: SMART BMS CONTROL BOARD (FR4 PCB with real components) ───── -->
  <g transform="translate(200, 140)">
    <rect x="0" y="0" width="400" height="70" rx="5" fill="url(#pcbGreenClean)" stroke="#065F46" stroke-width="1.5"/>
    
    <!-- Microcontroller Main IC Chip -->
    <rect x="30" y="20" width="35" height="35" fill="#0F172A" stroke="#334155" stroke-width="1"/>
    <circle cx="36" cy="26" r="1.5" fill="#FFFFFF"/>
    <line x1="25" y1="28" x2="30" y2="28" stroke="#CBD5E1" stroke-width="1.5"/>
    <line x1="25" y1="36" x2="30" y2="36" stroke="#CBD5E1" stroke-width="1.5"/>
    <line x1="25" y1="44" x2="30" y2="44" stroke="#CBD5E1" stroke-width="1.5"/>
    <line x1="65" y1="28" x2="70" y2="28" stroke="#CBD5E1" stroke-width="1.5"/>
    <line x1="65" y1="36" x2="70" y2="36" stroke="#CBD5E1" stroke-width="1.5"/>
    <line x1="65" y1="44" x2="70" y2="44" stroke="#CBD5E1" stroke-width="1.5"/>

    <!-- Bank of 6 High-Power MOSFET Switches on Aluminum Heatspreader -->
    <rect x="100" y="15" width="130" height="40" rx="3" fill="#334155" stroke="#1E293B" stroke-width="1"/>
    <rect x="108" y="20" width="14" height="28" fill="#0F172A"/>
    <rect x="128" y="20" width="14" height="28" fill="#0F172A"/>
    <rect x="148" y="20" width="14" height="28" fill="#0F172A"/>
    <rect x="168" y="20" width="14" height="28" fill="#0F172A"/>
    <rect x="188" y="20" width="14" height="28" fill="#0F172A"/>
    <rect x="208" y="20" width="14" height="28" fill="#0F172A"/>

    <!-- Balance Wire Harness Connector Header -->
    <rect x="250" y="22" width="60" height="26" rx="2" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1"/>
    <path d="M 260,48 Q 260,60 270,70" fill="none" stroke="#DC2626" stroke-width="1.5"/>
    <path d="M 275,48 Q 275,60 285,70" fill="none" stroke="#2563EB" stroke-width="1.5"/>
    <path d="M 290,48 Q 290,60 300,70" fill="none" stroke="#CA8A04" stroke-width="1.5"/>

    <!-- Copper Current Shunt Resistor -->
    <rect x="330" y="20" width="45" height="30" rx="3" fill="#CA8A04" stroke="#854D0E" stroke-width="1.5"/>
  </g>

  <!-- Exploded Guide Lines -->
  <line x1="220" y1="210" x2="220" y2="250" stroke="#059669" stroke-width="1.5" stroke-dasharray="4,4"/>
  <line x1="580" y1="210" x2="580" y2="250" stroke="#059669" stroke-width="1.5" stroke-dasharray="4,4"/>

  <!-- ── LAYER 3: CELL MATRIX & STRUCTURAL HOLDERS (Core Energy Module) ─────── -->
  <g transform="translate(190, 240)">
    <rect x="0" y="0" width="420" height="150" rx="6" fill="#1E293B" stroke="#0F172A" stroke-width="1.5"/>
    
    <!-- Cylindrical Cell Array in ABS Grid Holders -->
    <g transform="translate(25, 20)">
      <!-- Row 1 -->
      <circle cx="25" cy="25" r="22" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1.5"/>
      <circle cx="25" cy="25" r="16" fill="#059669"/>
      <circle cx="85" cy="25" r="22" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1.5"/>
      <circle cx="85" cy="25" r="16" fill="#059669"/>
      <circle cx="145" cy="25" r="22" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1.5"/>
      <circle cx="145" cy="25" r="16" fill="#059669"/>
      <circle cx="205" cy="25" r="22" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1.5"/>
      <circle cx="205" cy="25" r="16" fill="#059669"/>
      <circle cx="265" cy="25" r="22" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1.5"/>
      <circle cx="265" cy="25" r="16" fill="#059669"/>
      <circle cx="325" cy="25" r="22" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1.5"/>
      <circle cx="325" cy="25" r="16" fill="#059669"/>

      <!-- Row 2 -->
      <circle cx="25" cy="85" r="22" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1.5"/>
      <circle cx="25" cy="85" r="16" fill="#059669"/>
      <circle cx="85" cy="85" r="22" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1.5"/>
      <circle cx="85" cy="85" r="16" fill="#059669"/>
      <circle cx="145" cy="85" r="22" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1.5"/>
      <circle cx="145" cy="85" r="16" fill="#059669"/>
      <circle cx="205" cy="85" r="22" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1.5"/>
      <circle cx="205" cy="85" r="16" fill="#059669"/>
      <circle cx="265" cy="85" r="22" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1.5"/>
      <circle cx="265" cy="85" r="16" fill="#059669"/>
      <circle cx="325" cy="85" r="22" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1.5"/>
      <circle cx="325" cy="85" r="16" fill="#059669"/>

      <!-- Nickel Busbars with micro-welds -->
      <rect x="15" y="18" width="80" height="14" rx="2" fill="#CBD5E1" stroke="#64748B" stroke-width="1"/>
      <rect x="135" y="18" width="80" height="14" rx="2" fill="#CBD5E1" stroke="#64748B" stroke-width="1"/>
      <rect x="255" y="18" width="80" height="14" rx="2" fill="#CBD5E1" stroke="#64748B" stroke-width="1"/>
      
      <rect x="15" y="78" width="80" height="14" rx="2" fill="#CBD5E1" stroke="#64748B" stroke-width="1"/>
      <rect x="135" y="78" width="80" height="14" rx="2" fill="#CBD5E1" stroke="#64748B" stroke-width="1"/>
      <rect x="255" y="78" width="80" height="14" rx="2" fill="#CBD5E1" stroke="#64748B" stroke-width="1"/>
    </g>
  </g>

  <!-- Exploded Guide Lines -->
  <line x1="220" y1="390" x2="220" y2="425" stroke="#059669" stroke-width="1.5" stroke-dasharray="4,4"/>
  <line x1="580" y1="390" x2="580" y2="425" stroke="#059669" stroke-width="1.5" stroke-dasharray="4,4"/>

  <!-- ── LAYER 4: BOTTOM POWDER-COATED CHASSIS & MOUNTING BASE ──────────────── -->
  <g transform="translate(180, 425)">
    <rect x="10" y="0" width="440" height="85" rx="8" fill="url(#layerTopClean)" stroke="#94A3B8" stroke-width="2"/>
    
    <!-- Rubber Vibration Damping Pads -->
    <rect x="30" y="10" width="60" height="8" rx="2" fill="#0F172A"/>
    <rect x="140" y="10" width="60" height="8" rx="2" fill="#0F172A"/>
    <rect x="260" y="10" width="60" height="8" rx="2" fill="#0F172A"/>
    <rect x="370" y="10" width="60" height="8" rx="2" fill="#0F172A"/>

    <!-- Bottom Mounting Flanges with Bolt Holes -->
    <path d="M -10,65 L 10,65 L 10,80 L -10,80 Z" fill="#64748B" stroke="#334155" stroke-width="1.5"/>
    <ellipse cx="0" cy="72" rx="4" ry="2" fill="#1E293B"/>
    
    <path d="M 450,65 L 470,65 L 470,80 L 450,80 Z" fill="#64748B" stroke="#334155" stroke-width="1.5"/>
    <ellipse cx="460" cy="72" rx="4" ry="2" fill="#1E293B"/>

    <!-- Bottom MEHAR Nameplate -->
    <g transform="translate(110, 40)">
      <text x="0" y="10" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="12" font-weight="900" fill="#0F172A">ME<tspan fill="#059669">H</tspan>AR</text>
      <text x="50" y="10" font-family="monospace" font-size="9" font-weight="700" fill="#059669">CHASSIS BASE</text>
    </g>
  </g>
</svg>`;

// Write all clean SVGs to public directory
fs.writeFileSync(path.join(outputDir, 'mehar-2w-battery.svg'), svg2W);
fs.writeFileSync(path.join(outputDir, 'mehar-3w-battery.svg'), svg3W);
fs.writeFileSync(path.join(outputDir, 'mehar-ess-battery.svg'), svgESS);
fs.writeFileSync(path.join(outputDir, 'mehar-solar-battery.svg'), svgESS);
fs.writeFileSync(path.join(outputDir, 'mehar-ev-charger.svg'), svgESS);
fs.writeFileSync(path.join(outputDir, 'mehar-oem-battery.svg'), svg3W);
fs.writeFileSync(path.join(outputDir, 'mehar-forklift-battery.svg'), svg3W);
fs.writeFileSync(path.join(outputDir, 'mehar-agv-battery.svg'), svg2W);
fs.writeFileSync(path.join(outputDir, 'mehar-drone-battery.svg'), svg2W);
fs.writeFileSync(path.join(outputDir, 'mehar-telecom-battery.svg'), svgESS);
fs.writeFileSync(path.join(outputDir, 'mehar-cylindrical-cells.svg'), svgCylindrical);
fs.writeFileSync(path.join(outputDir, 'mehar-prismatic-cells.svg'), svgPrismatic);
fs.writeFileSync(path.join(outputDir, 'mehar-exploded-battery.svg'), svgExploded);

console.log('Successfully regenerated all 13 SVG visuals with 100% clean surfaces and zero fabricated text.');

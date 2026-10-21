import type { DiagramKind } from '@/types'

/**
 * 机位示意动画：俯视/侧视演示镜头与主体的相对运动。
 * 纯 SVG + SMIL 循环动画，运动轨迹由代码精确控制。
 */

const INK = '#47484c'
const ACCENT = '#b85c3e'
const MUTED = '#85868c'

function Subject({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y - 7} r={4} fill={INK} />
      <line x1={x} y1={y - 3} x2={x} y2={y + 8} stroke={INK} strokeWidth={2.4} />
      <line x1={x - 5} y1={y + 1} x2={x + 5} y2={y + 1} stroke={INK} strokeWidth={2.4} />
      <line x1={x} y1={y + 8} x2={x - 4} y2={y + 16} stroke={INK} strokeWidth={2.4} />
      <line x1={x} y1={y + 8} x2={x + 4} y2={y + 16} stroke={INK} strokeWidth={2.4} />
    </g>
  )
}

/** 环绕镜头：俯视图，摄影机绕主体做圆周运动，视锥始终指向中心 */
function OrbitDiagram() {
  const cx = 150
  const cy = 95
  const r = 58
  return (
    <svg viewBox="0 0 300 190" className="diagram-box" role="img" aria-label="环绕镜头俯视示意：摄影机绕主体做圆周运动">
      {/* 地面参考网格 */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={MUTED} strokeWidth={1} strokeDasharray="3 4" />
      <circle cx={cx} cy={cy} r={r + 22} fill="none" stroke={MUTED} strokeWidth={0.6} strokeDasharray="1 6" opacity={0.6} />
      {/* 主体（俯视） */}
      <circle cx={cx} cy={cy} r={6} fill={INK} />
      <circle cx={cx} cy={cy} r={10} fill="none" stroke={INK} strokeWidth={1} opacity={0.4} />
      {/* 旋转组：摄影机 + 指向中心的视锥 */}
      <g>
        <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur="6s" repeatCount="indefinite" />
        <polygon points={`${cx + r},${cy} ${cx + r - 26},${cy - 15} ${cx + r - 26},${cy + 15}`} fill={ACCENT} opacity={0.22} />
        <line x1={cx + r} y1={cy} x2={cx + r - 26} y2={cy - 15} stroke={ACCENT} strokeWidth={1} opacity={0.65} />
        <line x1={cx + r} y1={cy} x2={cx + r - 26} y2={cy + 15} stroke={ACCENT} strokeWidth={1} opacity={0.65} />
        <rect x={cx + r - 6} y={cy - 5} width={12} height={10} fill={ACCENT} rx={1.5} transform={`rotate(90 ${cx + r} ${cy})`} />
      </g>
      <text x={cx} y={cy + 26} textAnchor="middle" fontSize={9} fill={MUTED} fontFamily="JetBrains Mono, monospace">SUBJECT</text>
      <text x={cx} y="18" textAnchor="middle" fontSize={9} fill={MUTED} fontFamily="JetBrains Mono, monospace">TOP VIEW · 360° ORBIT</text>
    </svg>
  )
}

/** 低角度仰拍：侧视图，机位贴近地面，视锥从平视逐渐上扬 */
function LowAngleDiagram() {
  const camX = 62
  const camY = 150
  return (
    <svg viewBox="0 0 300 190" className="diagram-box" role="img" aria-label="低角度仰拍侧视示意：机位低于主体，视锥向上扬起">
      <line x1="16" y1={camY + 10} x2="284" y2={camY + 10} stroke={INK} strokeWidth={1.6} />
      {/* 远处天空参考线 */}
      <line x1="16" y1="34" x2="284" y2="34" stroke={MUTED} strokeWidth={0.7} strokeDasharray="2 5" opacity={0.7} />
      <Subject x={238} y={camY - 18} />
      <text x={238} y={camY + 28} textAnchor="middle" fontSize={9} fill={MUTED} fontFamily="JetBrains Mono, monospace">SUBJECT</text>
      {/* 摄影机 */}
      <rect x={camX - 10} y={camY - 6} width={20} height={13} fill={ACCENT} rx={2} />
      <circle cx={camX} cy={camY + 9} r={3.4} fill={INK} />
      {/* 上扬视锥：绕机位从 12° 摆动到 42° */}
      <g transform={`translate(${camX} ${camY})`}>
        <g>
          <animateTransform attributeName="transform" type="rotate" values="-12; -42; -12" dur="3.2s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1; 0.4 0 0.6 1" />
          <polygon points="0,0 118,-40 118,28" fill={ACCENT} opacity={0.18} />
          <line x1="0" y1="0" x2="118" y2="-40" stroke={ACCENT} strokeWidth={1.2} opacity={0.7} />
          <line x1="0" y1="0" x2="118" y2="28" stroke={ACCENT} strokeWidth={1.2} opacity={0.7} />
        </g>
      </g>
      <text x={camX} y={camY + 28} textAnchor="middle" fontSize={9} fill={MUTED} fontFamily="JetBrains Mono, monospace">CAMERA ↓</text>
      <text x="150" y="18" textAnchor="middle" fontSize={9} fill={MUTED} fontFamily="JetBrains Mono, monospace">SIDE VIEW · TILT UP</text>
    </svg>
  )
}

/** 推轨变焦：侧视图，摄影机向主体推进，同时视锥反向张大，背景山体放大 */
function DollyZoomDiagram() {
  const groundY = 160
  return (
    <svg viewBox="0 0 300 190" className="diagram-box" role="img" aria-label="推轨变焦侧视示意：摄影机推进同时变焦拉宽，背景放大">
      <line x1="16" y1={groundY} x2="284" y2={groundY} stroke={INK} strokeWidth={1.6} />
      {/* 背景山体：随变焦放大 */}
      <g transform={`translate(232 ${groundY})`}>
        <g>
          <animateTransform attributeName="transform" type="scale" values="1; 1.45; 1" dur="3.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1; 0.4 0 0.6 1" />
          <polygon points="-58,0 -22,-64 8,0" fill={MUTED} opacity={0.32} />
          <polygon points="-16,0 18,-44 48,0" fill={MUTED} opacity={0.22} />
        </g>
      </g>
      {/* 主体：大小保持不变 */}
      <Subject x={196} y={groundY - 30} />
      <text x={196} y={groundY + 16} textAnchor="middle" fontSize={9} fill={MUTED} fontFamily="JetBrains Mono, monospace">SUBJECT =</text>
      {/* 摄影机：向主体推进 */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 0; 56 0; 0 0" dur="3.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1; 0.4 0 0.6 1" />
        <rect x="46" y={groundY - 22} width={22} height={14} fill={ACCENT} rx={2} />
        <circle cx="57" cy={groundY - 5} r={3.4} fill={INK} />
        {/* 视锥：随推进反向张大（变焦拉宽） */}
        <g transform={`translate(68 ${groundY - 15})`}>
          <line x1="0" y1="0" x2="110" y2="-30" stroke={ACCENT} strokeWidth={1.2} opacity={0.7}>
            <animate attributeName="y2" values="-16;-34;-16" dur="3.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1; 0.4 0 0.6 1" />
          </line>
          <line x1="0" y1="0" x2="110" y2="20" stroke={ACCENT} strokeWidth={1.2} opacity={0.7}>
            <animate attributeName="y2" values="10;26;10" dur="3.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1; 0.4 0 0.6 1" />
          </line>
          <polygon points="0,0 110,-16 110,10" fill={ACCENT} opacity={0.14}>
            <animate attributeName="points" values="0,0 110,-16 110,10; 0,0 110,-34 110,26; 0,0 110,-16 110,10" dur="3.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1; 0.4 0 0.6 1" />
          </polygon>
        </g>
      </g>
      <text x="70" y={groundY + 16} textAnchor="middle" fontSize={9} fill={MUTED} fontFamily="JetBrains Mono, monospace">DOLLY →</text>
      <text x="150" y="18" textAnchor="middle" fontSize={9} fill={MUTED} fontFamily="JetBrains Mono, monospace">DOLLY IN + ZOOM OUT</text>
    </svg>
  )
}

/** 大远景：侧视，远景群山 + 广角视锥，摄影机缓慢推进 */
function EstablishingDiagram() {
  const groundY = 150
  return (
    <svg viewBox="0 0 300 190" className="diagram-box" role="img" aria-label="大远景侧视示意：广角视锥覆盖辽阔场景">
      <polygon points="40,150 110,60 170,150" fill={MUTED} opacity={0.25} />
      <polygon points="140,150 215,45 285,150" fill={MUTED} opacity={0.18} />
      <line x1="16" y1={groundY} x2="284" y2={groundY} stroke={INK} strokeWidth={1.6} />
      {/* 远景中的小人 */}
      <g>
        <circle cx={236} cy={groundY - 12} r={2.6} fill={INK} />
        <line x1={236} y1={groundY - 9} x2={236} y2={groundY - 2} stroke={INK} strokeWidth={1.6} />
        <line x1={236} y1={groundY - 2} x2={233} y2={groundY + 3} stroke={INK} strokeWidth={1.6} />
        <line x1={236} y1={groundY - 2} x2={239} y2={groundY + 3} stroke={INK} strokeWidth={1.6} />
      </g>
      {/* 摄影机缓慢推进 */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 0; 18 0; 0 0" dur="5s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1; 0.4 0 0.6 1" />
        <rect x="34" y={groundY - 24} width={20} height={12} fill={ACCENT} rx={2} />
        <circle cx="44" cy={groundY - 9} r={3} fill={INK} />
        <polygon points="54,132 240,58 240,146" fill={ACCENT} opacity={0.14} />
        <line x1="54" y1="132" x2="240" y2="58" stroke={ACCENT} strokeWidth={1} opacity={0.6} />
        <line x1="54" y1="132" x2="240" y2="146" stroke={ACCENT} strokeWidth={1} opacity={0.6} />
      </g>
      <text x="150" y="18" textAnchor="middle" fontSize={9} fill={MUTED} fontFamily="JetBrains Mono, monospace">WIDE FOV · SLOW PUSH-IN</text>
    </svg>
  )
}

/** 特写：侧视，摄影机贴近主体面部，窄视锥 */
function CloseupDiagram() {
  const cy = 100
  return (
    <svg viewBox="0 0 300 190" className="diagram-box" role="img" aria-label="特写侧视示意：摄影机贴近主体，窄视锥只取面部">
      {/* 主体头部（大） */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 0; 0 -2; 0 0" dur="2.4s" repeatCount="indefinite" />
        <circle cx={215} cy={cy} r={34} fill="none" stroke={INK} strokeWidth={2} />
        <circle cx={204} cy={cy - 8} r={3.4} fill={INK} />
        <path d={`M 200 ${cy + 12} Q 215 ${cy + 20} 230 ${cy + 12}`} stroke={INK} strokeWidth={2} fill="none" />
      </g>
      {/* 虚化背景块 */}
      <rect x="252" y="30" width="34" height="120" fill={MUTED} opacity={0.14} rx={6} />
      <rect x="258" y="48" width="26" height="90" fill={MUTED} opacity={0.1} rx={6} />
      {/* 摄影机（近） */}
      <rect x="86" y={cy - 10} width={22} height={14} fill={ACCENT} rx={2} />
      <circle cx="97" cy={cy + 8} r={3.2} fill={INK} />
      <polygon points={`108,${cy - 3} 176,${cy - 26} 176,${cy + 22}`} fill={ACCENT} opacity={0.16} />
      <line x1="108" y1={cy - 3} x2="176" y2={cy - 26} stroke={ACCENT} strokeWidth={1} opacity={0.65} />
      <line x1="108" y1={cy - 3} x2="176" y2={cy + 22} stroke={ACCENT} strokeWidth={1} opacity={0.65} />
      <text x="150" y="18" textAnchor="middle" fontSize={9} fill={MUTED} fontFamily="JetBrains Mono, monospace">TIGHT FOV · SHALLOW DOF</text>
    </svg>
  )
}

/** 荷兰角：正视，整个场景绕中心缓慢倾斜摇摆 */
function DutchDiagram() {
  return (
    <svg viewBox="0 0 300 190" className="diagram-box" role="img" aria-label="荷兰角正视示意：整个画面逐渐倾斜">
      {/* 外框：画幅 */}
      <rect x="30" y="24" width="240" height="140" fill="none" stroke={INK} strokeWidth={1.4} />
      {/* 倾斜的世界 */}
      <g>
        <animateTransform attributeName="transform" type="rotate" values="0 150 95; -18 150 95; -18 150 95; 0 150 95" keyTimes="0; 0.35; 0.65; 1" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1; 0 0 1 1; 0.4 0 0.6 1" />
        <line x1="-40" y1="128" x2="340" y2="128" stroke={MUTED} strokeWidth={1.4} strokeDasharray="6 4" />
        <Subject x={150} y={108} />
      </g>
      <text x="150" y="18" textAnchor="middle" fontSize={9} fill={MUTED} fontFamily="JetBrains Mono, monospace">FRAME TILTS · HORIZON OFF-AXIS</text>
      <text x="150" y="178" textAnchor="middle" fontSize={9} fill={MUTED} fontFamily="JetBrains Mono, monospace">FRAME STAYS LEVEL</text>
    </svg>
  )
}

/** 手持跟拍：俯视，摄影机与人同向移动，摄影机轨迹带抖动 */
function HandheldDiagram() {
  return (
    <svg viewBox="0 0 300 190" className="diagram-box" role="img" aria-label="手持跟拍俯视示意：摄影机跟随主体移动并自然晃动">
      {/* 路径 */}
      <line x1="30" y1="70" x2="270" y2="70" stroke={MUTED} strokeWidth={1} strokeDasharray="3 5" />
      <line x1="30" y1="130" x2="270" y2="130" stroke={MUTED} strokeWidth={1} strokeDasharray="3 5" opacity={0.5} />
      {/* 行走的主体 */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 0; 150 0; 0 0" dur="5s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1; 0.4 0 0.6 1" />
        <circle cx="60" cy="70" r={6} fill={INK} />
        <text x="60" y="52" textAnchor="middle" fontSize={9} fill={MUTED} fontFamily="JetBrains Mono, monospace">SUBJECT →</text>
      </g>
      {/* 跟随的摄影机：同步平移 + 高频抖动 */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 0; 150 0; 0 0" dur="5s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1; 0.4 0 0.6 1" />
        <g>
          <animateTransform attributeName="transform" type="translate" values="0 0; 2 -3; -2 2; 1.6 -1.4; 0 0" dur="0.5s" repeatCount="indefinite" />
          <rect x="52" y="122" width={16} height={11} fill={ACCENT} rx={2} />
          <polygon points="60,122 48,84 72,84" fill={ACCENT} opacity={0.18} />
        </g>
        <text x="60" y="152" textAnchor="middle" fontSize={9} fill={MUTED} fontFamily="JetBrains Mono, monospace">CAM →</text>
      </g>
      <text x="150" y="18" textAnchor="middle" fontSize={9} fill={MUTED} fontFamily="JetBrains Mono, monospace">TOP VIEW · FOLLOW + SHAKE</text>
    </svg>
  )
}

/** 慢动作：侧视，飘落物极慢下落 + 主体缓慢转身 */
function SlowmoDiagram() {
  return (
    <svg viewBox="0 0 300 190" className="diagram-box" role="img" aria-label="慢动作示意：时间被拉伸，落叶与动作都极缓慢">
      <line x1="16" y1="158" x2="284" y2="158" stroke={INK} strokeWidth={1.6} />
      {/* 缓慢转身的主体 */}
      <g transform="translate(150 130)">
        <g>
          <animateTransform attributeName="transform" type="scale" values="1 1; 0.25 1; 1 1" dur="7s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1; 0.4 0 0.6 1" />
          <circle cx={0} cy={-34} r={7} fill={INK} />
          <line x1={0} y1={-27} x2={0} y2={-6} stroke={INK} strokeWidth={3} />
          <line x1={-9} y1={-20} x2={9} y2={-20} stroke={INK} strokeWidth={3} />
          <line x1={0} y1={-6} x2={-7} y2={12} stroke={INK} strokeWidth={3} />
          <line x1={0} y1={-6} x2={7} y2={12} stroke={INK} strokeWidth={3} />
        </g>
      </g>
      {/* 极慢飘落的叶子 */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 0; -26 108" dur="9s" repeatCount="indefinite" />
        <ellipse cx="220" cy="40" rx="7" ry="3.4" fill={ACCENT} opacity={0.75}>
          <animateTransform attributeName="transform" type="rotate" values="0 220 40; 360 220 40" dur="4s" repeatCount="indefinite" />
        </ellipse>
      </g>
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 0; 20 96" dur="11s" repeatCount="indefinite" />
        <ellipse cx="90" cy="50" rx="6" ry="3" fill={ACCENT} opacity={0.5} />
      </g>
      <text x="150" y="18" textAnchor="middle" fontSize={9} fill={MUTED} fontFamily="JetBrains Mono, monospace">TIME STRETCHED · 120FPS</text>
    </svg>
  )
}

/** 子弹时间：俯视，主体冻结，摄影机沿弧线绕行 270° 后停住回退 */
function BulletTimeDiagram() {
  const cx = 150
  const cy = 95
  const r = 58
  return (
    <svg viewBox="0 0 300 190" className="diagram-box" role="img" aria-label="子弹时间俯视示意：主体冻结，摄影机绕行弧线">
      <path d={`M ${cx + r} ${cy} A ${r} ${r} 0 1 1 ${cx} ${cy - r}`} fill="none" stroke={MUTED} strokeWidth={1} strokeDasharray="3 4" />
      {/* 冻结的主体 + 静止尘埃 */}
      <circle cx={cx} cy={cy} r={6} fill={INK} />
      <circle cx={cx - 18} cy={cy - 12} r={1.6} fill={MUTED} />
      <circle cx={cx + 14} cy={cy - 20} r={1.6} fill={MUTED} />
      <circle cx={cx + 20} cy={cy + 10} r={1.6} fill={MUTED} />
      <circle cx={cx - 12} cy={cy + 16} r={1.6} fill={MUTED} />
      <text x={cx} y={cy + 28} textAnchor="middle" fontSize={9} fill={MUTED} fontFamily="JetBrains Mono, monospace">FROZEN ❄</text>
      {/* 摄影机：绕弧 270° 往返 */}
      <g>
        <animateTransform attributeName="transform" type="rotate" values={`0 ${cx} ${cy}; 270 ${cx} ${cy}; 0 ${cx} ${cy}`} dur="6.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1; 0.4 0 0.6 1" />
        <polygon points={`${cx + r},${cy} ${cx + r - 26},${cy - 15} ${cx + r - 26},${cy + 15}`} fill={ACCENT} opacity={0.22} />
        <rect x={cx + r - 6} y={cy - 5} width={12} height={10} fill={ACCENT} rx={1.5} transform={`rotate(90 ${cx + r} ${cy})`} />
      </g>
      <text x="150" y="18" textAnchor="middle" fontSize={9} fill={MUTED} fontFamily="JetBrains Mono, monospace">TIME FROZEN · CAMERA ARCS</text>
    </svg>
  )
}

/** 延时摄影：固定机位，太阳快速划过天空，山影扫动 */
function TimelapseDiagram() {
  return (
    <svg viewBox="0 0 300 190" className="diagram-box" role="img" aria-label="延时摄影示意：固定机位，日月快速划过，光影扫过大地">
      <polygon points="60,150 130,70 195,150" fill={MUTED} opacity={0.25} />
      <polygon points="150,150 225,55 292,150" fill={MUTED} opacity={0.18} />
      <line x1="16" y1="150" x2="284" y2="150" stroke={INK} strokeWidth={1.6} />
      {/* 扫动的山影 */}
      <polygon points="130,150 195,150 162,96" fill={INK} opacity={0.2}>
        <animateTransform attributeName="transform" type="skewX" values="-30; 30; -30" dur="4s" repeatCount="indefinite" />
      </polygon>
      {/* 太阳弧线快速移动 */}
      <g>
        <animateMotion dur="4s" repeatCount="indefinite" path="M 30 130 Q 150 -30 270 130" />
        <circle r={8} fill={ACCENT} />
        <circle r={12} fill="none" stroke={ACCENT} strokeWidth={1} opacity={0.4} />
      </g>
      {/* 固定摄影机 */}
      <rect x="24" y="128" width={18} height={12} fill={INK} rx={2} />
      <circle cx="33" cy="143" r={3} fill={INK} />
      <text x="150" y="18" textAnchor="middle" fontSize={9} fill={MUTED} fontFamily="JetBrains Mono, monospace">LOCKED CAMERA · TIME ACCELERATED</text>
    </svg>
  )
}

/** 对称构图：正视走廊，中轴线 + 两侧镜像树，主体向镜头走来逐渐变大 */
function SymmetryDiagram() {
  return (
    <svg viewBox="0 0 300 190" className="diagram-box" role="img" aria-label="对称构图正视示意：中轴线镜像，主体居中向镜头靠近">
      {/* 中轴线 */}
      <line x1="150" y1="26" x2="150" y2="164" stroke={ACCENT} strokeWidth={1} strokeDasharray="4 4" opacity={0.7} />
      {/* 镜像元素 */}
      {[70, 110].map((y, i) => (
        <g key={y}>
          <polygon points={`${96 - i * 8},${y + 30} ${116 - i * 8},${y - 14} ${136 - i * 8},${y + 30}`} fill={MUTED} opacity={0.35 - i * 0.1} />
          <polygon points={`${164 + i * 8},${y + 30} ${184 + i * 8},${y - 14} ${204 + i * 8},${y + 30}`} fill={MUTED} opacity={0.35 - i * 0.1} />
        </g>
      ))}
      <line x1="96" y1="100" x2="30" y2="164" stroke={MUTED} strokeWidth={1} opacity={0.5} />
      <line x1="204" y1="100" x2="270" y2="164" stroke={MUTED} strokeWidth={1} opacity={0.5} />
      {/* 走近的主体 */}
      <g transform="translate(150 148)">
        <g>
          <animateTransform attributeName="transform" type="scale" values="0.55; 1.05; 0.55" dur="4.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1; 0.4 0 0.6 1" />
          <circle cx={0} cy={-26} r={6} fill={INK} />
          <line x1={0} y1={-20} x2={0} y2={-2} stroke={INK} strokeWidth={2.6} />
          <line x1={-7} y1={-14} x2={7} y2={-14} stroke={INK} strokeWidth={2.6} />
          <line x1={0} y1={-2} x2={-5} y2={12} stroke={INK} strokeWidth={2.6} />
          <line x1={0} y1={-2} x2={5} y2={12} stroke={INK} strokeWidth={2.6} />
        </g>
      </g>
      <text x="150" y="18" textAnchor="middle" fontSize={9} fill={MUTED} fontFamily="JetBrains Mono, monospace">CENTER AXIS · MIRRORED</text>
    </svg>
  )
}

/** 框架构图：正视，前景拱门作画框，视线缓推穿过拱门 */
function FrameDiagram() {
  return (
    <svg viewBox="0 0 300 190" className="diagram-box" role="img" aria-label="框架构图正视示意：前景拱门形成画中画，镜头缓推">
      {/* 框内世界（缓推放大） */}
      <g transform="translate(150 95)">
        <g>
          <animateTransform attributeName="transform" type="scale" values="1; 1.18; 1" dur="5s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1; 0.4 0 0.6 1" />
          <circle cx="0" cy="-58" r={14} fill={ACCENT} opacity={0.35} />
          <polygon points="-52,60 -16,6 20,60" fill={MUTED} opacity={0.3} />
          <polygon points="0,60 34,16 66,60" fill={MUTED} opacity={0.22} />
          <g transform="translate(6 42)">
            <circle cx={0} cy={-10} r={3.4} fill={INK} />
            <line x1={0} y1={-6} x2={0} y2={4} stroke={INK} strokeWidth={1.8} />
            <line x1={0} y1={4} x2={-3} y2={11} stroke={INK} strokeWidth={1.8} />
            <line x1={0} y1={4} x2={3} y2={11} stroke={INK} strokeWidth={1.8} />
          </g>
        </g>
      </g>
      {/* 前景拱门（画框） */}
      <path d="M 30 190 L 30 70 Q 150 -20 270 70 L 270 190 L 236 190 L 236 84 Q 150 26 64 84 L 64 190 Z" fill={INK} opacity={0.85} fillRule="evenodd" />
      <text x="150" y="184" textAnchor="middle" fontSize={9} fill="#f6f6f3" fontFamily="JetBrains Mono, monospace">FOREGROUND FRAME · PUSH THROUGH</text>
    </svg>
  )
}

export function CameraDiagram({ kind }: { kind: DiagramKind }) {
  if (kind === 'orbit') return <OrbitDiagram />
  if (kind === 'lowangle') return <LowAngleDiagram />
  if (kind === 'dollyzoom') return <DollyZoomDiagram />
  if (kind === 'establishing') return <EstablishingDiagram />
  if (kind === 'closeup') return <CloseupDiagram />
  if (kind === 'dutch') return <DutchDiagram />
  if (kind === 'handheld') return <HandheldDiagram />
  if (kind === 'slowmo') return <SlowmoDiagram />
  if (kind === 'bullettime') return <BulletTimeDiagram />
  if (kind === 'timelapse') return <TimelapseDiagram />
  if (kind === 'symmetry') return <SymmetryDiagram />
  return <FrameDiagram />
}

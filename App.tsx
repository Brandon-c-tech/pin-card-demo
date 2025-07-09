// src/App.tsx
import React, { useState, useEffect, useRef } from 'react'

// 航班卡片组件，支持展开/收起
function FlightCard({ flight, mode = 'message', onDoubleClick }: {
  flight: any,
  mode?: 'top' | 'message',
  onDoubleClick?: () => void
}) {
  const [expanded, setExpanded] = React.useState(false)
  // 响应式宽度和排版
  const cardClass = mode === 'top'
    ? 'w-full flex justify-center mb-4'
    : 'flex justify-center mb-2';
  // 置顶卡片顶部无圆角，底部有圆角
  const innerClass = mode === 'top'
    ? 'bg-white shadow-md px-6 py-4 flex flex-col w-full max-w-lg cursor-pointer transition-all duration-200'
    : 'bg-white rounded-2xl shadow px-4 py-3 flex flex-col max-w-lg w-full cursor-pointer transition-all duration-200';
  const style = mode === 'top'
    ? { borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: '1rem', borderBottomRightRadius: '1rem' }
    : {};
  return (
    <div className={cardClass} onDoubleClick={onDoubleClick}>
      <div
        className={innerClass + (expanded ? ' ring-2 ring-[#da6f34]' : '')}
        style={style}
        onClick={() => setExpanded(e => !e)}
      >
        <div className="flex items-center">
          <img src={flight.logo} alt="Airline Logo" className="w-12 h-12 rounded-full mr-4 object-contain bg-[#f5f5f5] p-1" />
          <div className="flex-1 min-w-0">
            {/* 第一行：航班号和航司 */}
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-lg text-[#222] truncate">{flight.flightNo}</span>
              <span className="text-sm text-gray-500 ml-2 flex-shrink-0">{flight.airline}</span>
            </div>
            {/* 第二行：起降地和时间 */}
            <div className="flex items-center justify-between">
              <div className="text-base font-bold text-[#1a355b]">
                <span>{flight.from}</span>
                <span className="mx-1 text-gray-400">→</span>
                <span>{flight.to}</span>
              </div>
              <div className="text-xs text-gray-400 whitespace-nowrap ml-2">{flight.time}</div>
            </div>
          </div>
        </div>
        {/* 展开内容 */}
        <div
          className={
            'overflow-hidden transition-all duration-300' +
            (expanded ? ' max-h-40 opacity-100 mt-3' : ' max-h-0 opacity-0')
          }
        >
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-gray-700">
            <div><span className="font-semibold">航班状态：</span>准点</div>
            <div><span className="font-semibold">登机口：</span>E23</div>
            <div><span className="font-semibold">票价：</span>¥1234</div>
            <div><span className="font-semibold">行李额：</span>23kg</div>
            <div className="w-full"><span className="font-semibold">备注：</span>请提前2小时到达机场，携带有效证件。</div>
          </div>
        </div>
        {/* 展开/收起icon */}
        <div className="flex justify-center mt-1">
          <span className="text-xs text-gray-400 select-none">{expanded ? '收起' : '展开'}</span>
        </div>
      </div>
    </div>
  )
}

const FLIGHT_DEMO = {
  flightNo: 'CA1234',
  airline: 'CA',
  from: 'PEK',
  to: 'HKG',
  time: '07:30 - 09:55',
  logo: 'data:image/png;base64,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'
};

const PRESET_MESSAGES = [
  { id: 1, text: '我这个月底在香港', sender: 'other' },
  { id: 2, text: '那我可以飞过来，估计就呆一个周末吧', sender: 'me', suggestion: true },
];

function App() {
  const [messages, setMessages] = useState<any[]>(PRESET_MESSAGES)
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const [topFlight, setTopFlight] = useState<null | { flight: any, msgIdx: number }>(null)
  const [menu, setMenu] = useState<{ show: boolean, idx: number | null, top: boolean } | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('http://35.223.31.25:8000/api/test')
      .then(res => res.json())
      .then(data => {
        setMessages(prev => [{ id: Date.now(), text: data.message, sender: 'server' }, ...prev])
      })
      .catch(err => setError(err.toString()))
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // 发送消息
  const handleSend = () => {
    if (!input.trim()) return
    setMessages(prev => [
      ...prev,
      { id: Date.now(), text: input, sender: 'me' },
      { id: Date.now() + 1, text: '收到：' + input, sender: 'other' },
    ])
    setInput('')
  }

  // 发送航班卡片
  const sendFlightCard = () => {
    setMessages(prev => [
      ...prev,
      { id: Date.now(), type: 'flight', sender: 'me', flight: FLIGHT_DEMO },
    ])
  }

  // 双击消息卡片弹菜单
  const handleFlightDoubleClick = (idx: number, isTop: boolean) => {
    setMenu({ show: true, idx, top: isTop })
  }

  // 菜单操作
  const handleMenuAction = (action: string) => {
    if (!menu) return
    if (action === 'top') {
      // 置顶
      const msg = messages[menu.idx!]
      setTopFlight({ flight: msg.flight, msgIdx: menu.idx! })
    } else if (action === 'cancel') {
      setTopFlight(null)
    } else if (action === 'goto') {
      // 滚动到原消息
      const el = document.getElementById('flight-msg-' + topFlight?.msgIdx)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setTopFlight(null)
    }
    setMenu(null)
  }

  return (
    <div className="flex flex-col h-screen bg-[#F0EDE6] max-w-md mx-auto relative">
      {/* 聊天头部 */}
      <div className="p-2 bg-white text-[#222] text-lg font-bold flex items-center shadow-sm sticky top-0 z-10 min-h-[48px]">
        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar" className="w-8 h-8 rounded-full mr-2 border border-[#eee]" />
        <span className="text-lg font-semibold">Brandon</span>
      </div>
      {/* 置顶航班卡片 */}
      {topFlight && (
        <FlightCard flight={topFlight.flight} mode="top" onDoubleClick={() => handleFlightDoubleClick(topFlight.msgIdx, true)} />
      )}
      {/* 聊天消息列表 */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3 pb-32">
        {error && <div className="text-red-500 text-center">Error: {error}</div>}
        {messages.map((msg, idx) => (
          <React.Fragment key={msg.id}>
            {/* 航班卡片消息 */}
            {msg.type === 'flight' ? (
              topFlight && topFlight.msgIdx === idx ? (
                // 如果已置顶，则原位置显示小气泡
                <div id={'flight-msg-' + idx} className="flex justify-center">
                  <div className="bg-gray-200 text-gray-500 text-xs rounded-full px-3 py-1 my-1 shadow-sm">航班信息卡片 - 已置顶</div>
                </div>
              ) : (
                <div id={'flight-msg-' + idx} className="flex justify-center">
                  <FlightCard flight={msg.flight} mode="message" onDoubleClick={() => handleFlightDoubleClick(idx, false)} />
                </div>
              )
            ) : (
              <div className={msg.sender === 'me' ? 'flex justify-end' : 'flex justify-start'}>
                <div
                  className={
                    'px-4 py-2 max-w-[75%] break-words text-[16px] ' +
                    (msg.sender === 'me'
                      ? 'bg-[#FEE9D8] text-[#222] rounded-2xl rounded-br-md shadow'
                      : 'bg-white text-[#222] rounded-2xl rounded-bl-md shadow')
                  }
                  style={{
                    borderTopRightRadius: msg.sender === 'me' ? '0.75rem' : '1.5rem',
                    borderTopLeftRadius: msg.sender !== 'me' ? '0.75rem' : '1.5rem',
                    borderBottomRightRadius: msg.sender === 'me' ? '0.5rem' : '1.5rem',
                    borderBottomLeftRadius: msg.sender !== 'me' ? '0.5rem' : '1.5rem',
                  }}
                >
                  {msg.text}
                </div>
              </div>
            )}
            {/* 建议条 */}
            {msg.suggestion && (
              <div className="flex justify-end mt-1">
                <div className="bg-gray-200 text-gray-600 text-xs rounded-xl px-3 py-2 flex items-center gap-2">
                  Suggestion：香港往返机票
                  <button
                    className="ml-2 px-2 py-1 bg-[#da6f34] text-white rounded-full text-xs font-semibold hover:bg-[#b85a28] transition"
                    onClick={sendFlightCard}
                  >确认</button>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* 弹出菜单 */}
      {menu?.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20" onClick={() => setMenu(null)}>
          <div className="bg-white rounded-xl shadow-lg p-6 min-w-[200px] flex flex-col gap-3" onClick={e => e.stopPropagation()}>
            {!menu.top && <button className="text-[#da6f34] font-semibold" onClick={() => handleMenuAction('top')}>置顶</button>}
            {menu.top && <button className="text-[#da6f34] font-semibold" onClick={() => handleMenuAction('cancel')}>取消置顶</button>}
            {menu.top && <button className="text-gray-700" onClick={() => handleMenuAction('goto')}>回到消息位置</button>}
            <button className="text-gray-400" onClick={() => setMenu(null)}>取消</button>
          </div>
        </div>
      )}
      {/* 输入框悬浮区 */}
      <div className="absolute left-0 right-0 bottom-6 flex justify-center pointer-events-none select-none">
        <div className="flex items-center bg-white rounded-2xl shadow-lg px-3 py-2 w-[95%] max-w-xl pointer-events-auto select-auto">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F0EDE6] text-[#da6f34] text-2xl font-bold mr-2 active:scale-95 transition">+</button>
          <input
            type="text"
            className="flex-1 rounded-full border-none px-3 py-2 focus:outline-none bg-transparent text-[16px]"
            placeholder="输入消息..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSend() }}
          />
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#da6f34] text-white ml-2 active:scale-95 transition shadow"
            onClick={handleSend}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 20l15-8-15-8v6l10 2-10 2v6z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default App

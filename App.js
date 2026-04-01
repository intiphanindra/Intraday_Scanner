import { useState, useEffect, useCallback } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// 160+ NSE STOCKS
// ─────────────────────────────────────────────────────────────────────────────
const STOCK_LIST = [
  // NIFTY 50
  { symbol: "RELIANCE.NS", name: "Reliance Ind.", sector: "Energy" },
  { symbol: "TCS.NS", name: "TCS", sector: "IT" },
  { symbol: "INFY.NS", name: "Infosys", sector: "IT" },
  { symbol: "HDFCBANK.NS", name: "HDFC Bank", sector: "Finance" },
  { symbol: "ICICIBANK.NS", name: "ICICI Bank", sector: "Finance" },
  { symbol: "WIPRO.NS", name: "Wipro", sector: "IT" },
  { symbol: "SBIN.NS", name: "SBI", sector: "Finance" },
  { symbol: "TATAMOTORS.NS", name: "Tata Motors", sector: "Auto" },
  { symbol: "BAJFINANCE.NS", name: "Bajaj Finance", sector: "Finance" },
  { symbol: "SUNPHARMA.NS", name: "Sun Pharma", sector: "Pharma" },
  { symbol: "MARUTI.NS", name: "Maruti Suzuki", sector: "Auto" },
  { symbol: "HCLTECH.NS", name: "HCL Tech", sector: "IT" },
  { symbol: "AXISBANK.NS", name: "Axis Bank", sector: "Finance" },
  { symbol: "ITC.NS", name: "ITC", sector: "FMCG" },
  { symbol: "BHARTIARTL.NS", name: "Bharti Airtel", sector: "Telecom" },
  { symbol: "KOTAKBANK.NS", name: "Kotak Bank", sector: "Finance" },
  { symbol: "LT.NS", name: "L&T", sector: "Infra" },
  { symbol: "ONGC.NS", name: "ONGC", sector: "Energy" },
  { symbol: "NTPC.NS", name: "NTPC", sector: "Power" },
  { symbol: "ADANIENT.NS", name: "Adani Ent.", sector: "Conglomerate" },
  { symbol: "POWERGRID.NS", name: "Power Grid", sector: "Power" },
  { symbol: "TATASTEEL.NS", name: "Tata Steel", sector: "Metal" },
  { symbol: "HINDALCO.NS", name: "Hindalco", sector: "Metal" },
  { symbol: "JSWSTEEL.NS", name: "JSW Steel", sector: "Metal" },
  { symbol: "BAJAJ-AUTO.NS", name: "Bajaj Auto", sector: "Auto" },
  { symbol: "HEROMOTOCO.NS", name: "Hero MotoCorp", sector: "Auto" },
  { symbol: "EICHERMOT.NS", name: "Eicher Motors", sector: "Auto" },
  { symbol: "M%26M.NS", name: "Mahindra & Mahindra", sector: "Auto" },
  { symbol: "ULTRACEMCO.NS", name: "UltraTech Cement", sector: "Cement" },
  { symbol: "GRASIM.NS", name: "Grasim", sector: "Conglomerate" },
  { symbol: "ASIANPAINT.NS", name: "Asian Paints", sector: "FMCG" },
  { symbol: "NESTLEIND.NS", name: "Nestle India", sector: "FMCG" },
  { symbol: "HINDUNILVR.NS", name: "HUL", sector: "FMCG" },
  { symbol: "BRITANNIA.NS", name: "Britannia", sector: "FMCG" },
  { symbol: "TATACONSUM.NS", name: "Tata Consumer", sector: "FMCG" },
  { symbol: "CIPLA.NS", name: "Cipla", sector: "Pharma" },
  { symbol: "DRREDDY.NS", name: "Dr. Reddy's", sector: "Pharma" },
  { symbol: "DIVISLAB.NS", name: "Divi's Labs", sector: "Pharma" },
  { symbol: "APOLLOHOSP.NS", name: "Apollo Hospitals", sector: "Healthcare" },
  { symbol: "TECHM.NS", name: "Tech Mahindra", sector: "IT" },
  { symbol: "LTIM.NS", name: "LTIMindtree", sector: "IT" },
  { symbol: "MPHASIS.NS", name: "Mphasis", sector: "IT" },
  { symbol: "PERSISTENT.NS", name: "Persistent Systems", sector: "IT" },
  { symbol: "COFORGE.NS", name: "Coforge", sector: "IT" },
  { symbol: "BPCL.NS", name: "BPCL", sector: "Energy" },
  { symbol: "IOC.NS", name: "Indian Oil", sector: "Energy" },
  { symbol: "HPCL.NS", name: "HPCL", sector: "Energy" },
  { symbol: "COALINDIA.NS", name: "Coal India", sector: "Mining" },
  { symbol: "VEDL.NS", name: "Vedanta", sector: "Metal" },
  { symbol: "SAIL.NS", name: "SAIL", sector: "Metal" },
  // BANKING / FINANCE
  { symbol: "BANKBARODA.NS", name: "Bank of Baroda", sector: "Finance" },
  { symbol: "CANBK.NS", name: "Canara Bank", sector: "Finance" },
  { symbol: "PNB.NS", name: "Punjab Nat. Bank", sector: "Finance" },
  { symbol: "UNIONBANK.NS", name: "Union Bank", sector: "Finance" },
  { symbol: "IDFCFIRSTB.NS", name: "IDFC First Bank", sector: "Finance" },
  { symbol: "FEDERALBNK.NS", name: "Federal Bank", sector: "Finance" },
  { symbol: "BANDHANBNK.NS", name: "Bandhan Bank", sector: "Finance" },
  { symbol: "RBLBANK.NS", name: "RBL Bank", sector: "Finance" },
  { symbol: "INDUSINDBK.NS", name: "IndusInd Bank", sector: "Finance" },
  { symbol: "YESBANK.NS", name: "Yes Bank", sector: "Finance" },
  { symbol: "LICHSGFIN.NS", name: "LIC Housing Fin.", sector: "Finance" },
  { symbol: "MUTHOOTFIN.NS", name: "Muthoot Finance", sector: "Finance" },
  { symbol: "BAJAJFINSV.NS", name: "Bajaj FinServ", sector: "Finance" },
  { symbol: "CHOLAFIN.NS", name: "Chola Finance", sector: "Finance" },
  { symbol: "SHRIRAMFIN.NS", name: "Shriram Finance", sector: "Finance" },
  { symbol: "M%26MFIN.NS", name: "M&M Financial", sector: "Finance" },
  { symbol: "RECLTD.NS", name: "REC Ltd", sector: "Finance" },
  { symbol: "PFC.NS", name: "Power Fin. Corp", sector: "Finance" },
  { symbol: "IRFC.NS", name: "IRFC", sector: "Finance" },
  // AUTO ANCILLARY
  { symbol: "BOSCHLTD.NS", name: "Bosch India", sector: "Auto Anc." },
  { symbol: "MOTHERSON.NS", name: "Motherson Sumi", sector: "Auto Anc." },
  { symbol: "BALKRISIND.NS", name: "Balkrishna Ind.", sector: "Auto Anc." },
  { symbol: "MRF.NS", name: "MRF", sector: "Auto Anc." },
  { symbol: "APOLLOTYRE.NS", name: "Apollo Tyres", sector: "Auto Anc." },
  { symbol: "CEATLTD.NS", name: "CEAT", sector: "Auto Anc." },
  // IT / TECH (NEW AGE)
  { symbol: "NAUKRI.NS", name: "Info Edge (Naukri)", sector: "IT" },
  { symbol: "ZOMATO.NS", name: "Zomato", sector: "Tech" },
  { symbol: "PAYTM.NS", name: "Paytm (One97)", sector: "Tech" },
  { symbol: "NYKAA.NS", name: "Nykaa (FSN)", sector: "Tech" },
  { symbol: "DELHIVERY.NS", name: "Delhivery", sector: "Logistics" },
  { symbol: "POLICYBZR.NS", name: "PB Fintech", sector: "Tech" },
  { symbol: "DIXON.NS", name: "Dixon Tech", sector: "Electronics" },
  { symbol: "AMBER.NS", name: "Amber Enterprises", sector: "Electronics" },
  { symbol: "KAYNES.NS", name: "Kaynes Technology", sector: "Electronics" },
  // PHARMA / HEALTHCARE
  { symbol: "LUPIN.NS", name: "Lupin", sector: "Pharma" },
  { symbol: "AUROPHARMA.NS", name: "Aurobindo Pharma", sector: "Pharma" },
  { symbol: "TORNTPHARM.NS", name: "Torrent Pharma", sector: "Pharma" },
  { symbol: "BIOCON.NS", name: "Biocon", sector: "Pharma" },
  { symbol: "IPCALAB.NS", name: "IPCA Labs", sector: "Pharma" },
  { symbol: "MAXHEALTH.NS", name: "Max Healthcare", sector: "Healthcare" },
  { symbol: "FORTIS.NS", name: "Fortis Healthcare", sector: "Healthcare" },
  { symbol: "METROPOLIS.NS", name: "Metropolis Health", sector: "Healthcare" },
  { symbol: "LALPATHLAB.NS", name: "Dr Lal PathLabs", sector: "Healthcare" },
  // CEMENT
  { symbol: "AMBUJACEM.NS", name: "Ambuja Cement", sector: "Cement" },
  { symbol: "ACC.NS", name: "ACC", sector: "Cement" },
  { symbol: "SHREECEM.NS", name: "Shree Cement", sector: "Cement" },
  { symbol: "DALMIACEMNT.NS", name: "Dalmia Bharat", sector: "Cement" },
  { symbol: "JKCEMENT.NS", name: "JK Cement", sector: "Cement" },
  // INFRASTRUCTURE
  { symbol: "SIEMENS.NS", name: "Siemens India", sector: "Infra" },
  { symbol: "ABB.NS", name: "ABB India", sector: "Infra" },
  { symbol: "BHEL.NS", name: "BHEL", sector: "Infra" },
  { symbol: "CUMMINSIND.NS", name: "Cummins India", sector: "Infra" },
  { symbol: "THERMAX.NS", name: "Thermax", sector: "Infra" },
  { symbol: "KEC.NS", name: "KEC International", sector: "Infra" },
  { symbol: "KALPATPOWR.NS", name: "Kalpataru Power", sector: "Infra" },
  { symbol: "IRCON.NS", name: "IRCON Intl.", sector: "Infra" },
  { symbol: "RVNL.NS", name: "RVNL", sector: "Infra" },
  { symbol: "RAILVIKAS.NS", name: "Rail Vikas Nigam", sector: "Infra" },
  // POWER / RENEWABLE
  { symbol: "TATAPOWER.NS", name: "Tata Power", sector: "Power" },
  { symbol: "ADANIGREEN.NS", name: "Adani Green", sector: "Power" },
  { symbol: "ADANIPORTS.NS", name: "Adani Ports", sector: "Infra" },
  { symbol: "ADANIPOWER.NS", name: "Adani Power", sector: "Power" },
  { symbol: "TORNTPOWER.NS", name: "Torrent Power", sector: "Power" },
  { symbol: "CESC.NS", name: "CESC", sector: "Power" },
  { symbol: "SJVN.NS", name: "SJVN", sector: "Power" },
  { symbol: "NHPC.NS", name: "NHPC", sector: "Power" },
  { symbol: "IREDA.NS", name: "IREDA", sector: "Power" },
  { symbol: "SUZLON.NS", name: "Suzlon Energy", sector: "Power" },
  { symbol: "INOXWIND.NS", name: "Inox Wind", sector: "Power" },
  // CHEMICALS
  { symbol: "PIDILITIND.NS", name: "Pidilite Ind.", sector: "Chemicals" },
  { symbol: "SRF.NS", name: "SRF Ltd", sector: "Chemicals" },
  { symbol: "TATACHEM.NS", name: "Tata Chemicals", sector: "Chemicals" },
  { symbol: "DEEPAKNTR.NS", name: "Deepak Nitrite", sector: "Chemicals" },
  { symbol: "NAVINFLUOR.NS", name: "Navin Fluorine", sector: "Chemicals" },
  { symbol: "FINEORG.NS", name: "Fine Organics", sector: "Chemicals" },
  // DEFENCE / PSU
  { symbol: "HAL.NS", name: "HAL", sector: "Defence" },
  { symbol: "BEL.NS", name: "BEL", sector: "Defence" },
  { symbol: "COCHINSHIP.NS", name: "Cochin Shipyard", sector: "Defence" },
  { symbol: "MAZDOCK.NS", name: "Mazagon Dock", sector: "Defence" },
  { symbol: "BEML.NS", name: "BEML", sector: "Defence" },
  { symbol: "CONCOR.NS", name: "Container Corp.", sector: "Logistics" },
  // REAL ESTATE
  { symbol: "DLF.NS", name: "DLF", sector: "Real Estate" },
  { symbol: "GODREJPROP.NS", name: "Godrej Properties", sector: "Real Estate" },
  { symbol: "OBEROIRLTY.NS", name: "Oberoi Realty", sector: "Real Estate" },
  { symbol: "PHOENIXLTD.NS", name: "Phoenix Mills", sector: "Real Estate" },
  { symbol: "PRESTIGE.NS", name: "Prestige Estates", sector: "Real Estate" },
  { symbol: "BRIGADE.NS", name: "Brigade Ent.", sector: "Real Estate" },
  // RETAIL / CONSUMER
  { symbol: "DMART.NS", name: "DMart (Avenue)", sector: "Retail" },
  { symbol: "TRENT.NS", name: "Trent", sector: "Retail" },
  { symbol: "TITAN.NS", name: "Titan Company", sector: "Retail" },
  { symbol: "KALYAN.NS", name: "Kalyan Jewellers", sector: "Retail" },
  { symbol: "PAGEIND.NS", name: "Page Industries", sector: "Retail" },
  { symbol: "SHOPERSTOP.NS", name: "Shoppers Stop", sector: "Retail" },
  { symbol: "ABFRL.NS", name: "Aditya Birla Fashion", sector: "Retail" },
  { symbol: "SENCO.NS", name: "Senco Gold", sector: "Retail" },
  // FMCG / FOOD
  { symbol: "JUBLFOOD.NS", name: "Jubilant FoodWorks", sector: "FMCG" },
  { symbol: "DEVYANI.NS", name: "Devyani Intl.", sector: "FMCG" },
  { symbol: "WESTLIFE.NS", name: "Westlife Devt.", sector: "FMCG" },
  // TELECOM / MEDIA
  { symbol: "IDEA.NS", name: "Vodafone Idea", sector: "Telecom" },
  { symbol: "TATACOMM.NS", name: "Tata Comm.", sector: "Telecom" },
  { symbol: "HFCL.NS", name: "HFCL", sector: "Telecom" },
  { symbol: "ZEEL.NS", name: "Zee Ent.", sector: "Media" },
  { symbol: "SUNTV.NS", name: "Sun TV Network", sector: "Media" },
  { symbol: "NETWORK18.NS", name: "Network18", sector: "Media" },
  // HOTELS / AVIATION / TRAVEL
  { symbol: "INDIGO.NS", name: "IndiGo (InterGlobe)", sector: "Aviation" },
  { symbol: "SPICEJET.NS", name: "SpiceJet", sector: "Aviation" },
  { symbol: "LEMONTREE.NS", name: "Lemon Tree Hotels", sector: "Hotels" },
  { symbol: "INDHOTEL.NS", name: "Indian Hotels (Taj)", sector: "Hotels" },
  { symbol: "EIHOTEL.NS", name: "EIH (Oberoi)", sector: "Hotels" },
  { symbol: "IRCTC.NS", name: "IRCTC", sector: "Travel" },
  // TEXTILE / MISC
  { symbol: "TRIDENT.NS", name: "Trident Ltd", sector: "Textile" },
  { symbol: "WELCORP.NS", name: "Welspun Corp", sector: "Steel" },
  { symbol: "DOMS.NS", name: "DOMS Industries", sector: "Consumer" },
];

// ─────────────────────────────────────────────────────────────────────────────
// TECHNICAL ANALYSIS
// ─────────────────────────────────────────────────────────────────────────────
function calcEMA(values, period) {
  if (!values || values.length < period) return [];
  const k = 2 / (period + 1);
  let ema = values.slice(0, period).reduce((a, b) => a + b, 0) / period;
  const result = new Array(period - 1).fill(null);
  result.push(ema);
  for (let i = period; i < values.length; i++) {
    ema = values[i] * k + ema * (1 - k);
    result.push(ema);
  }
  return result;
}

function calcRSI(closes, period = 14) {
  if (!closes || closes.length < period + 2) return null;
  let g = 0, l = 0;
  for (let i = 1; i <= period; i++) {
    const d = closes[i] - closes[i - 1];
    if (d > 0) g += d; else l -= d;
  }
  let ag = g / period, al = l / period;
  for (let i = period + 1; i < closes.length; i++) {
    const d = closes[i] - closes[i - 1];
    ag = (ag * (period - 1) + Math.max(0, d)) / period;
    al = (al * (period - 1) + Math.max(0, -d)) / period;
  }
  if (al === 0) return 100;
  return parseFloat((100 - 100 / (1 + ag / al)).toFixed(1));
}

function calcATR(candles, period = 14) {
  if (!candles || candles.length < 2) return 0;
  const trs = candles.slice(1).map((c, i) =>
    Math.max(c.high - c.low, Math.abs(c.high - candles[i].close), Math.abs(c.low - candles[i].close))
  );
  return trs.slice(-period).reduce((a, b) => a + b, 0) / Math.min(period, trs.length);
}

function detectPattern(candles) {
  if (!candles || candles.length < 3) return "N/A";
  const c = candles[candles.length - 1];
  const p = candles[candles.length - 2];
  const pp = candles[candles.length - 3];
  const cB = Math.abs(c.close - c.open), cR = c.high - c.low || 0.01;
  const pB = Math.abs(p.close - p.open), ppB = Math.abs(pp.close - pp.open);
  const lW = Math.min(c.open, c.close) - c.low;
  const uW = c.high - Math.max(c.open, c.close);
  if (cB <= cR * 0.08) return "Doji ⟺";
  if (lW >= cB * 2 && uW < cB * 0.5 && c.close > c.open) return "Hammer 🔨";
  if (uW >= cB * 2 && lW < cB * 0.5 && c.close < c.open) return "Shooting Star ⭐";
  if (p.close < p.open && c.close > c.open && c.open < p.close && c.close > p.open) return "Bull Engulfing 🟢";
  if (p.close > p.open && c.close < c.open && c.open > p.close && c.close < p.open) return "Bear Engulfing 🔴";
  if (pp.close < pp.open && pB < ppB * 0.35 && c.close > c.open && c.close > (pp.open + pp.close) / 2) return "Morning Star 🌟";
  if (pp.close > pp.open && pB < ppB * 0.35 && c.close < c.open && c.close < (pp.open + pp.close) / 2) return "Evening Star 🌆";
  if (cB > cR * 0.88) return c.close > c.open ? "Marubozu Bull ▲" : "Marubozu Bear ▼";
  if (lW >= cR * 0.6 && cB < cR * 0.25 && uW < cR * 0.15) return "Dragonfly Doji 🐉";
  if (uW >= cR * 0.6 && cB < cR * 0.25 && lW < cR * 0.15) return "Gravestone Doji 🪦";
  return c.close >= c.open ? "Bullish Candle ▲" : "Bearish Candle ▼";
}

function analyzeStock(candles) {
  if (!candles || candles.length < 22) return null;
  const closes = candles.map(c => c.close);
  const rsi = calcRSI(closes);
  const ema9arr = calcEMA(closes, 9);
  const ema21arr = calcEMA(closes, 21);
  const pattern = detectPattern(candles.slice(-3));
  const last = closes[closes.length - 1];
  const ema9 = ema9arr[ema9arr.length - 1];
  const ema21 = ema21arr[ema21arr.length - 1];
  const vwap = candles.slice(-20).map(c => (c.high + c.low + c.close) / 3).reduce((a, b) => a + b, 0) / 20;
  const atr = calcATR(candles.slice(-14));
  let score = 50; const reasons = [];

  if (rsi != null) {
    if (rsi < 30) { score += 22; reasons.push("RSI Oversold"); }
    else if (rsi < 45) { score += 12; reasons.push("RSI Bullish Zone"); }
    else if (rsi > 70) { score -= 22; reasons.push("RSI Overbought"); }
    else if (rsi > 60) { score -= 10; reasons.push("RSI Bearish Zone"); }
    else reasons.push("RSI Neutral");
  }
  if (ema9 && ema21) {
    if (ema9 > ema21) { score += 15; reasons.push("EMA9 > EMA21 ↑"); }
    else { score -= 12; reasons.push("EMA9 < EMA21 ↓"); }
  }
  if (last > vwap) { score += 10; reasons.push("Above VWAP"); }
  else { score -= 8; reasons.push("Below VWAP"); }

  const bullPat = ["Hammer", "Bull Engulfing", "Morning Star", "Marubozu Bull", "Dragonfly"];
  const bearPat = ["Shooting Star", "Bear Engulfing", "Evening Star", "Marubozu Bear", "Gravestone"];
  if (bullPat.some(p => pattern.startsWith(p))) score += 8;
  if (bearPat.some(p => pattern.startsWith(p))) score -= 8;

  const l3 = closes.slice(-3);
  if (l3[2] > l3[1] && l3[1] > l3[0]) { score += 5; reasons.push("3-Bar Momentum ↑"); }
  else if (l3[2] < l3[1] && l3[1] < l3[0]) { score -= 5; reasons.push("3-Bar Downtrend ↓"); }

  const vols = candles.map(c => c.volume || 0);
  const avgVol = vols.slice(-10, -1).reduce((a, b) => a + b, 0) / 9 || 1;
  if (vols[vols.length - 1] > avgVol * 1.5) { score += 5; reasons.push("Volume Spike 🔊"); }

  score = Math.max(0, Math.min(100, Math.round(score)));
  let signal, color;
  if (score >= 72) { signal = "STRONG BUY"; color = "#00ff88"; }
  else if (score >= 58) { signal = "BUY"; color = "#7fff00"; }
  else if (score >= 44) { signal = "NEUTRAL"; color = "#ffd700"; }
  else if (score >= 30) { signal = "SELL"; color = "#ff8800"; }
  else { signal = "STRONG SELL"; color = "#ff3333"; }

  const isBuy = signal.includes("BUY");
  const target = isBuy ? last + atr * 2.2 : last - atr * 2.2;
  const stopLoss = isBuy ? last - atr * 1.1 : last + atr * 1.1;
  const change = ((last - closes[0]) / closes[0]) * 100;

  return {
    rsi, pattern, score, signal, color, reasons,
    entry: last.toFixed(2), target: target.toFixed(2), stopLoss: stopLoss.toFixed(2),
    lastClose: last.toFixed(2), change: change.toFixed(2),
    high: Math.max(...candles.map(c => c.high)).toFixed(2),
    low: Math.min(...candles.map(c => c.low)).toFixed(2),
    ema9: ema9?.toFixed(2), ema21: ema21?.toFixed(2),
    vwap: vwap.toFixed(2), atr: atr.toFixed(2),
    candles: candles.slice(-35),
  };
}

function calcQty(capital, entry, stopLoss, riskPct, minInv) {
  const ep = parseFloat(entry), sl = parseFloat(stopLoss);
  if (!ep || ep <= 0) return 0;
  const risk = capital * (riskPct / 100);
  const perShare = Math.abs(ep - sl);
  let qty = perShare > 0.01 ? Math.floor(risk / perShare) : Math.floor(capital / ep);
  qty = Math.max(qty, Math.ceil(minInv / ep), 1);
  return qty;
}

// ─────────────────────────────────────────────────────────────────────────────
// MINI CANDLESTICK CHART
// ─────────────────────────────────────────────────────────────────────────────
function MiniChart({ candles, w = 200, h = 80 }) {
  if (!candles || !candles.length) return null;
  const pl = { t: 4, r: 4, b: 4, l: 40 };
  const cW = w - pl.l - pl.r, cH = h - pl.t - pl.b;
  const minP = Math.min(...candles.map(c => c.low));
  const maxP = Math.max(...candles.map(c => c.high));
  const rng = (maxP - minP) || 1;
  const gap = cW / candles.length;
  const cw = Math.max(1.5, gap * 0.65);
  const toY = p => pl.t + cH - ((p - minP) / rng) * cH;
  const toX = i => pl.l + i * gap + gap / 2;
  const fmt = v => v >= 1000 ? (v / 1000).toFixed(1) + "k" : v.toFixed(1);
  return (
    <svg width={w} height={h} style={{ display: "block", overflow: "visible" }}>
      {[minP, (minP + maxP) / 2, maxP].map((p, i) => {
        const y = toY(p);
        return (
          <g key={i}>
            <line x1={pl.l} y1={y} x2={w - pl.r} y2={y} stroke="#ffffff08" strokeWidth="1" />
            <text x={pl.l - 3} y={y + 3.5} fill="#3a5060" fontSize="7" textAnchor="end">{fmt(p)}</text>
          </g>
        );
      })}
      {candles.map((c, i) => {
        const bull = c.close >= c.open;
        const col = bull ? "#00d97e" : "#ff4d4d";
        const bT = toY(Math.max(c.open, c.close));
        const bB = toY(Math.min(c.open, c.close));
        const bH = Math.max(1, bB - bT);
        const x = toX(i);
        return (
          <g key={i}>
            <line x1={x} y1={toY(c.high)} x2={x} y2={toY(c.low)} stroke={col} strokeWidth={1} opacity={0.8} />
            <rect x={x - cw / 2} y={bT} width={cw} height={bH} fill={col} opacity={0.9} rx="0.5" />
          </g>
        );
      })}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LOADING SCREEN
// ─────────────────────────────────────────────────────────────────────────────
function Loader({ progress, done, total, current }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "70vh", gap: "16px" }}>
      <div style={{ fontSize: "36px" }}>📊</div>
      <div style={{ color: "#00ff88", fontSize: "14px", fontWeight: "700", letterSpacing: "4px" }}>SCANNING {total} NSE STOCKS</div>
      <div style={{ width: "300px", height: "5px", background: "#0d1520", borderRadius: "3px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg,#00ff88,#00bbff)", transition: "width 0.3s ease", borderRadius: "3px" }} />
      </div>
      <div style={{ color: "#ffd700", fontSize: "12px" }}>{done} / {total} stocks fetched · {progress}%</div>
      <div style={{ color: "#2d4a60", fontSize: "9px", letterSpacing: "0.5px", maxWidth: "320px", textAlign: "center" }}>{current}</div>
      <div style={{ color: "#161e2a", fontSize: "9px" }}>5-Min Candles · RSI · EMA9/21 · VWAP · ATR · Volume · Candlestick Pattern</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const SIG_COL = { "STRONG BUY": "#00ff88", "BUY": "#7fff00", "NEUTRAL": "#ffd700", "SELL": "#ff8800", "STRONG SELL": "#ff3333" };
const SECTORS = ["ALL", "IT", "Finance", "Auto", "Pharma", "Energy", "FMCG", "Metal", "Power", "Infra", "Real Estate", "Defence", "Chemicals", "Tech", "Retail", "Healthcare", "Cement", "Telecom", "Hotels", "Aviation", "Media"];
const PAGE_SIZE = 35;

// ─────────────────────────────────────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [stockData, setStockData] = useState({});
  const [loading, setLoading] = useState(true);
  const [prog, setProg] = useState(0);
  const [fetchDone, setFetchDone] = useState(0);
  const [currentFetch, setCurrentFetch] = useState("");
  const [capital, setCapital] = useState(5000);
  const [minInv, setMinInv] = useState(100);
  const [riskPct, setRiskPct] = useState(1);
  const [lastSync, setLastSync] = useState(null);
  const [selected, setSelected] = useState(null);
  const [time, setTime] = useState(new Date());
  const [err, setErr] = useState(null);
  const [sigFilter, setSigFilter] = useState("ALL");
  const [sectorFilter, setSectorFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("score");
  const [search, setSearch] = useState("");
  const [affordable, setAffordable] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const fetchStock = async (symbol) => {
    try {
      const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=5m&range=1d&includePrePost=false`;
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      if (!res.ok) return null;
      const d = await res.json();
      const r = d?.chart?.result?.[0];
      if (!r) return null;
      const ts = r.timestamp || [], q = r.indicators?.quote?.[0] || {};
      const candles = ts.map((t, i) => ({
        time: new Date(t * 1000),
        open: q.open?.[i], high: q.high?.[i], low: q.low?.[i],
        close: q.close?.[i], volume: q.volume?.[i] || 0,
      })).filter(c => c.open != null && c.high > 0 && !isNaN(c.close));
      return candles;
    } catch { return null; }
  };

  const loadAll = useCallback(async () => {
    setLoading(true); setProg(0); setFetchDone(0); setErr(null);
    const nd = {}; let done = 0;
    for (let i = 0; i < STOCK_LIST.length; i += 4) {
      const batch = STOCK_LIST.slice(i, i + 4);
      setCurrentFetch(batch.map(s => s.name).join("  ·  "));
      const results = await Promise.all(batch.map(s => fetchStock(s.symbol)));
      results.forEach((candles, j) => {
        const st = batch[j];
        if (candles && candles.length >= 22) {
          const analysis = analyzeStock(candles);
          if (analysis) nd[st.symbol] = { ...st, ...analysis };
        }
        done++;
      });
      setFetchDone(done);
      setProg(Math.round((done / STOCK_LIST.length) * 100));
      await new Promise(r => setTimeout(r, 110));
    }
    if (Object.keys(nd).length === 0) {
      setErr("⚠ No data received. Please check: 1) NSE market is open (9:15 AM–3:30 PM IST, Mon–Fri) 2) Your internet connection 3) Try again in a few seconds.");
    }
    setStockData(nd);
    setLastSync(new Date());
    setLoading(false);
    setPage(0);
  }, []);

  useEffect(() => {
    loadAll();
    const iv = setInterval(loadAll, 5 * 60 * 1000);
    return () => clearInterval(iv);
  }, [loadAll]);

  const getIST = () => {
    const ist = new Date(time.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
    const m = ist.getHours() * 60 + ist.getMinutes();
    return { open: m >= 555 && m <= 930 };
  };
  const { open: marketOpen } = getIST();

  const fmtIST = d => d?.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true,
  }) ?? "---";

  const allStocks = Object.values(stockData);

  const filtered = allStocks.filter(s => {
    if (sigFilter === "BUY" && !s.signal.includes("BUY")) return false;
    if (sigFilter === "SELL" && !s.signal.includes("SELL")) return false;
    if (sigFilter === "NEUTRAL" && s.signal !== "NEUTRAL") return false;
    if (sectorFilter !== "ALL" && s.sector !== sectorFilter) return false;
    if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.symbol.toLowerCase().includes(search.toLowerCase())) return false;
    if (affordable && parseFloat(s.lastClose) > minInv) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === "score") return b.score - a.score;
    if (sortBy === "change") return parseFloat(b.change) - parseFloat(a.change);
    if (sortBy === "rsi") return (a.rsi ?? 50) - (b.rsi ?? 50);
    if (sortBy === "price↑") return parseFloat(a.lastClose) - parseFloat(b.lastClose);
    if (sortBy === "price↓") return parseFloat(b.lastClose) - parseFloat(a.lastClose);
    return 0;
  });

  const topBuys = allStocks.filter(s => s.signal === "STRONG BUY").sort((a, b) => b.score - a.score).slice(0, 6);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const Chip = ({ label, active, onClick, ac = "#00ff88" }) => (
    <button onClick={onClick} style={{ background: active ? `${ac}14` : "transparent", border: `1px solid ${active ? ac + "40" : "#0d1828"}`, color: active ? ac : "#2d4060", padding: "3px 9px", borderRadius: "10px", cursor: "pointer", fontSize: "8px", fontFamily: "inherit", whiteSpace: "nowrap" }}>{label}</button>
  );

  return (
    <div style={{ fontFamily: "'Courier New', 'JetBrains Mono', monospace", background: "#03060d", color: "#a8c0d0", minHeight: "100vh" }}>

      {/* ── HEADER ── */}
      <div style={{ background: "#050910", borderBottom: "1px solid #00ff8815", padding: "9px 16px", position: "sticky", top: 0, zIndex: 200, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "6px", boxShadow: "0 2px 24px #00000099" }}>
        <div>
          <span style={{ color: "#00ff88", fontSize: "15px", fontWeight: "700", letterSpacing: "3px" }}>◈ NSE/BSE INTRADAY SCANNER</span>
          <span style={{ color: "#152030", fontSize: "8px", marginLeft: "10px" }}>{STOCK_LIST.length} STOCKS · LIVE 5-MIN DATA</span>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <div style={{ color: marketOpen ? "#00ff88" : "#ff5555", fontSize: "9px", padding: "3px 10px", borderRadius: "10px", background: marketOpen ? "#00ff8810" : "#ff555510", border: `1px solid ${marketOpen ? "#00ff8828" : "#ff555528"}`, fontWeight: "700" }}>
            ● {marketOpen ? "MARKET OPEN" : "MARKET CLOSED"}
          </div>
          <div style={{ color: "#3a5068", fontSize: "10px" }}>{fmtIST(time)} IST</div>
          {lastSync && <div style={{ color: "#1a2a38", fontSize: "8px" }}>Synced: {fmtIST(lastSync)}</div>}
          <button onClick={loadAll} style={{ background: "#0a1420", border: "1px solid #00ff8828", color: "#00ff88", padding: "5px 14px", borderRadius: "5px", cursor: "pointer", fontSize: "10px", letterSpacing: "1px", fontFamily: "inherit" }}>↻ RESCAN</button>
        </div>
      </div>

      {loading && <Loader progress={prog} done={fetchDone} total={STOCK_LIST.length} current={currentFetch} />}

      {!loading && err && (
        <div style={{ padding: "60px 20px", textAlign: "center" }}>
          <div style={{ fontSize: "40px", marginBottom: "14px" }}>📴</div>
          <div style={{ color: "#ff6040", fontSize: "13px", marginBottom: "10px" }}>{err}</div>
          <div style={{ color: "#2d4060", fontSize: "10px", marginBottom: "16px" }}>
            Market Hours: Monday–Friday, 9:15 AM – 3:30 PM IST<br />
            Upcoming Holiday: April 3 (Good Friday), April 14 (Ambedkar Jayanti)
          </div>
          <button onClick={loadAll} style={{ background: "transparent", border: "1px solid #00ff8840", color: "#00ff88", padding: "10px 24px", borderRadius: "6px", cursor: "pointer", fontSize: "11px", letterSpacing: "2px", fontFamily: "inherit" }}>↻ RETRY</button>
        </div>
      )}

      {!loading && !err && (
        <div style={{ padding: "10px 14px" }}>

          {/* SETTINGS */}
          <div style={{ background: "#060b16", border: "1px solid #0a1828", borderRadius: "8px", padding: "10px 14px", marginBottom: "10px", display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "flex-end" }}>
            {[
              ["CAPITAL (₹)", capital, setCapital, "100px", "number"],
              ["MIN INVEST (₹)", minInv, setMinInv, "80px", "number"],
              ["RISK %", riskPct, setRiskPct, "65px", "number"],
            ].map(([label, val, setter, width]) => (
              <div key={label}>
                <div style={{ color: "#2d4060", fontSize: "7px", letterSpacing: "0.8px", marginBottom: "3px" }}>{label}</div>
                <input type="number" value={val} onChange={e => setter(+e.target.value)}
                  style={{ background: "#080d18", border: "1px solid #0e1e2e", color: "#ffd700", padding: "5px 8px", borderRadius: "4px", fontSize: "11px", width, outline: "none", fontFamily: "inherit" }} />
              </div>
            ))}
            <div>
              <div style={{ color: "#2d4060", fontSize: "7px", marginBottom: "3px" }}>SEARCH STOCK</div>
              <input type="text" value={search} onChange={e => { setSearch(e.target.value); setPage(0); }} placeholder="Name or symbol..."
                style={{ background: "#080d18", border: "1px solid #0e1e2e", color: "#a8c0d0", padding: "5px 9px", borderRadius: "4px", fontSize: "11px", width: "140px", outline: "none", fontFamily: "inherit" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", paddingBottom: "3px" }}
              onClick={() => { setAffordable(v => !v); setPage(0); }}>
              <div style={{ width: "15px", height: "15px", borderRadius: "3px", background: affordable ? "#00ff88" : "transparent", border: "1px solid #00ff8840", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {affordable && <span style={{ color: "#000", fontSize: "10px", fontWeight: "900", lineHeight: 1 }}>✓</span>}
              </div>
              <span style={{ color: "#3a5060", fontSize: "8px" }}>Show only ≤ ₹{minInv}/share</span>
            </div>
          </div>

          {/* FILTERS ROW */}
          <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", marginBottom: "6px", alignItems: "center" }}>
            <span style={{ color: "#1e3040", fontSize: "7px", letterSpacing: "1px" }}>SIGNAL:</span>
            {["ALL", "BUY", "SELL", "NEUTRAL"].map(f => <Chip key={f} label={f} active={sigFilter === f} onClick={() => { setSigFilter(f); setPage(0); }} ac="#00ff88" />)}
            <span style={{ color: "#1e3040", fontSize: "7px", letterSpacing: "1px", marginLeft: "8px" }}>SORT:</span>
            {["score", "change", "rsi", "price↑", "price↓"].map(s => <Chip key={s} label={s.toUpperCase()} active={sortBy === s} onClick={() => { setSortBy(s); setPage(0); }} ac="#00bbff" />)}
          </div>
          <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginBottom: "12px" }}>
            {SECTORS.map(s => <Chip key={s} label={s} active={sectorFilter === s} onClick={() => { setSectorFilter(s); setPage(0); }} ac="#cc88ff" />)}
          </div>

          {/* SUMMARY STATS */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "6px", marginBottom: "14px" }}>
            {[["Analyzed", allStocks.length, "#a0c0d0"], ["Strong Buy", allStocks.filter(s => s.signal === "STRONG BUY").length, "#00ff88"], ["Buy", allStocks.filter(s => s.signal === "BUY").length, "#7fff00"], ["Neutral", allStocks.filter(s => s.signal === "NEUTRAL").length, "#ffd700"], ["Sell/Avoid", allStocks.filter(s => s.signal.includes("SELL")).length, "#ff5555"]].map(([l, v, c]) => (
              <div key={l} style={{ background: "#050a14", border: "1px solid #0a1520", borderRadius: "6px", padding: "9px", textAlign: "center" }}>
                <div style={{ color: "#2d4060", fontSize: "7px" }}>{l}</div>
                <div style={{ color: c, fontSize: "22px", fontWeight: "700" }}>{v}</div>
              </div>
            ))}
          </div>

          {/* TOP PICKS */}
          {topBuys.length > 0 && (
            <div style={{ marginBottom: "16px" }}>
              <div style={{ color: "#2d4060", fontSize: "9px", letterSpacing: "2px", marginBottom: "8px" }}>
                <span style={{ color: "#00ff88" }}>▶</span> TODAY'S STRONGEST BUY SIGNALS
                <span style={{ color: "#1a2838" }}> — Click any card for full trade plan</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: "8px" }}>
                {topBuys.map(s => {
                  const qty = calcQty(capital, s.entry, s.stopLoss, riskPct, minInv);
                  const inv = (qty * parseFloat(s.entry)).toFixed(0);
                  const profit = ((parseFloat(s.target) - parseFloat(s.entry)) * qty).toFixed(0);
                  const rr = Math.abs((parseFloat(s.target) - parseFloat(s.entry)) / (Math.abs(parseFloat(s.entry) - parseFloat(s.stopLoss)) || 0.01)).toFixed(1);
                  return (
                    <div key={s.symbol} onClick={() => setSelected(s)} style={{ background: "linear-gradient(145deg,#040e09,#050a14)", border: `1px solid ${s.color}22`, borderRadius: "10px", padding: "11px", cursor: "pointer", position: "relative", overflow: "hidden" }}>
                      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg,transparent,${s.color},transparent)` }} />
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                        <div>
                          <div style={{ color: "#ddeeff", fontSize: "12px", fontWeight: "700" }}>{s.name}</div>
                          <div style={{ color: "#2d4060", fontSize: "7px" }}>{s.sector} · ₹{s.lastClose}</div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ color: s.color, fontSize: "7px", fontWeight: "700", padding: "1px 6px", borderRadius: "2px", background: `${s.color}18` }}>{s.signal}</div>
                          <div style={{ color: "#ffd700", fontSize: "10px", marginTop: "2px" }}>⚡ {s.score}</div>
                        </div>
                      </div>
                      <MiniChart candles={s.candles} w={188} h={75} />
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "3px", marginTop: "6px" }}>
                        {[["ENTRY", `₹${s.entry}`, "#00bbff"], ["TARGET", `₹${s.target}`, "#00ff88"], ["SL", `₹${s.stopLoss}`, "#ff4444"]].map(([l, v, c]) => (
                          <div key={l} style={{ background: "#040810", borderRadius: "4px", padding: "4px 5px", textAlign: "center" }}>
                            <div style={{ color: "#2d4060", fontSize: "6px" }}>{l}</div>
                            <div style={{ color: c, fontSize: "8.5px", fontWeight: "700" }}>{v}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "3px", marginTop: "3px" }}>
                        {[["QTY", qty, "#ffd700"], ["PROFIT", `₹${profit}`, "#00ff88"], ["R:R", `1:${rr}`, "#00bbff"]].map(([l, v, c]) => (
                          <div key={l} style={{ background: "#040810", borderRadius: "4px", padding: "4px 5px", textAlign: "center" }}>
                            <div style={{ color: "#2d4060", fontSize: "6px" }}>{l}</div>
                            <div style={{ color: c, fontSize: "8.5px", fontWeight: "700" }}>{v}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ marginTop: "6px", display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "#2d4060", fontSize: "7px" }}>{s.pattern}</span>
                        <span style={{ color: parseFloat(s.change) >= 0 ? "#00d97e" : "#ff5555", fontSize: "8px" }}>{parseFloat(s.change) >= 0 ? "+" : ""}{s.change}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ALL STOCKS TABLE */}
          <div>
            <div style={{ color: "#2d4060", fontSize: "9px", letterSpacing: "1px", marginBottom: "7px" }}>
              <span style={{ color: "#00bbff" }}>▶</span> {filtered.length} STOCKS · Page {page + 1} / {Math.max(1, totalPages)}
            </div>
            <div style={{ background: "#050910", border: "1px solid #0a1520", borderRadius: "8px", overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1.4fr 0.8fr 70px 60px 44px 120px 58px 95px", padding: "7px 12px", borderBottom: "1px solid #080f1c", fontSize: "7px", color: "#1e3040", letterSpacing: "1px" }}>
                <div>STOCK</div><div>SIGNAL</div><div style={{ textAlign: "right" }}>LTP (₹)</div>
                <div style={{ textAlign: "right" }}>CHG%</div><div style={{ textAlign: "right" }}>RSI</div>
                <div>PATTERN</div><div style={{ textAlign: "right" }}>SCORE</div><div style={{ textAlign: "right" }}>ENTRY/SL/TGT · QTY</div>
              </div>
              {paged.map((s, i) => {
                const qty = calcQty(capital, s.entry, s.stopLoss, riskPct, minInv);
                const inv = (qty * parseFloat(s.entry)).toFixed(0);
                return (
                  <div key={s.symbol} onClick={() => setSelected(s)} style={{ display: "grid", gridTemplateColumns: "1.4fr 0.8fr 70px 60px 44px 120px 58px 95px", padding: "7px 12px", borderBottom: "1px solid #07090f", cursor: "pointer", background: i % 2 ? "#06090f50" : "transparent", fontSize: "10px", alignItems: "center" }}>
                    <div>
                      <div style={{ color: "#d0e4f0", fontWeight: "600", fontSize: "10px" }}>{s.name}</div>
                      <div style={{ color: "#182430", fontSize: "7px" }}>{s.sector}</div>
                    </div>
                    <div>
                      <span style={{ color: SIG_COL[s.signal] || "#ffd700", fontSize: "7px", fontWeight: "700", padding: "1px 5px", borderRadius: "2px", background: `${SIG_COL[s.signal] || "#ffd700"}12` }}>{s.signal}</span>
                    </div>
                    <div style={{ color: "#fff", textAlign: "right" }}>₹{s.lastClose}</div>
                    <div style={{ color: parseFloat(s.change) >= 0 ? "#00d97e" : "#ff5555", textAlign: "right", fontWeight: "600" }}>{parseFloat(s.change) >= 0 ? "+" : ""}{s.change}%</div>
                    <div style={{ textAlign: "right", color: s.rsi < 30 ? "#00ff88" : s.rsi > 70 ? "#ff4444" : "#4a6a80" }}>{s.rsi ?? "—"}</div>
                    <div style={{ color: "#304858", fontSize: "7.5px" }}>{s.pattern}</div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "3px", justifyContent: "flex-end" }}>
                        <div style={{ width: "30px", height: "3px", background: "#080e18", borderRadius: "2px" }}>
                          <div style={{ height: "100%", width: `${s.score}%`, background: SIG_COL[s.signal] || "#ffd700", borderRadius: "2px" }} />
                        </div>
                        <span style={{ color: "#4a6070", fontSize: "8px" }}>{s.score}</span>
                      </div>
                    </div>
                    <div style={{ textAlign: "right", fontSize: "7.5px", lineHeight: "1.7" }}>
                      <span style={{ color: "#00bbff" }}>₹{s.entry}</span> / <span style={{ color: "#ff4444" }}>₹{s.stopLoss}</span>
                      <br /><span style={{ color: "#00ff88" }}>₹{s.target}</span>
                      <br /><span style={{ color: "#ffd70060" }}>×{qty} = ₹{parseInt(inv).toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                );
              })}
              {paged.length === 0 && <div style={{ padding: "36px", textAlign: "center", color: "#2d4060", fontSize: "12px" }}>No stocks match your filters</div>}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div style={{ display: "flex", justifyContent: "center", gap: "5px", marginTop: "12px", flexWrap: "wrap" }}>
                <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} style={{ background: "transparent", border: "1px solid #0d1828", color: page === 0 ? "#152030" : "#3a5060", padding: "5px 12px", borderRadius: "4px", cursor: page === 0 ? "default" : "pointer", fontSize: "9px", fontFamily: "inherit" }}>← Prev</button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button key={i} onClick={() => setPage(i)} style={{ background: page === i ? "#0a1828" : "transparent", border: `1px solid ${page === i ? "#00bbff40" : "#0d1828"}`, color: page === i ? "#00bbff" : "#2d4060", padding: "5px 9px", borderRadius: "4px", cursor: "pointer", fontSize: "9px", fontFamily: "inherit" }}>{i + 1}</button>
                ))}
                <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1} style={{ background: "transparent", border: "1px solid #0d1828", color: page === totalPages - 1 ? "#152030" : "#3a5060", padding: "5px 12px", borderRadius: "4px", cursor: page === totalPages - 1 ? "default" : "pointer", fontSize: "9px", fontFamily: "inherit" }}>Next →</button>
              </div>
            )}
          </div>

          <div style={{ marginTop: "16px", padding: "10px 14px", background: "#040710", borderRadius: "6px", color: "#182838", fontSize: "8px", lineHeight: "1.8" }}>
            ⚠ DISCLAIMER: For educational & informational purposes only. NOT SEBI-registered financial advice. Intraday trading is highly risky — losses can exceed investment. Always use stop-loss. Never trade with borrowed money. Past candlestick patterns ≠ future results. Data from Yahoo Finance (5-min NSE candles). Auto-refreshes every 5 minutes during market hours.
          </div>
        </div>
      )}

      {/* ── DETAIL MODAL ── */}
      {selected && (() => {
        const qty = calcQty(capital, selected.entry, selected.stopLoss, riskPct, minInv);
        const inv = (qty * parseFloat(selected.entry)).toFixed(0);
        const profit = ((parseFloat(selected.target) - parseFloat(selected.entry)) * qty).toFixed(0);
        const maxLoss = Math.abs((parseFloat(selected.entry) - parseFloat(selected.stopLoss)) * qty).toFixed(0);
        const rr = Math.abs((parseFloat(selected.target) - parseFloat(selected.entry)) / (Math.abs(parseFloat(selected.entry) - parseFloat(selected.stopLoss)) || 0.01)).toFixed(1);
        const isBuy = selected.signal.includes("BUY");
        const pctT = (((parseFloat(selected.target) - parseFloat(selected.entry)) / parseFloat(selected.entry)) * 100).toFixed(2);
        const pctSL = (((parseFloat(selected.stopLoss) - parseFloat(selected.entry)) / parseFloat(selected.entry)) * 100).toFixed(2);
        return (
          <div style={{ position: "fixed", inset: 0, background: "#000000dd", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 500, padding: "12px" }} onClick={() => setSelected(null)}>
            <div style={{ background: "#060a14", border: `1px solid ${selected.color}28`, borderRadius: "12px", padding: "18px", maxWidth: "560px", width: "100%", maxHeight: "93vh", overflowY: "auto", position: "relative", boxShadow: `0 0 80px ${selected.color}0c` }} onClick={e => e.stopPropagation()}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", borderRadius: "12px 12px 0 0", background: `linear-gradient(90deg,transparent,${selected.color},transparent)` }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
                <div>
                  <div style={{ color: "#ffffff", fontSize: "18px", fontWeight: "700" }}>{selected.name}</div>
                  <div style={{ color: "#2d4060", fontSize: "9px" }}>{selected.symbol} · NSE · {selected.sector}</div>
                </div>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <span style={{ color: selected.color, fontSize: "9px", fontWeight: "700", padding: "4px 10px", borderRadius: "4px", background: `${selected.color}18`, letterSpacing: "1px" }}>{selected.signal}</span>
                  <button onClick={() => setSelected(null)} style={{ background: "transparent", border: "none", color: "#3a5060", fontSize: "20px", cursor: "pointer", lineHeight: 1 }}>✕</button>
                </div>
              </div>
              <div style={{ background: "#02050d", borderRadius: "6px", padding: "8px", marginBottom: "14px" }}>
                <MiniChart candles={selected.candles} w={524} h={170} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "6px", marginBottom: "14px" }}>
                {[["LTP", `₹${selected.lastClose}`, "#fff"], ["CHANGE", `${parseFloat(selected.change) >= 0 ? "+" : ""}${selected.change}%`, parseFloat(selected.change) >= 0 ? "#00d97e" : "#ff5555"], ["SCORE", `${selected.score}/100`, "#ffd700"], ["RSI (14)", selected.rsi ?? "—", selected.rsi < 30 ? "#00ff88" : selected.rsi > 70 ? "#ff5555" : "#7a9ab0"], ["EMA 9", selected.ema9, "#ffd700"], ["EMA 21", selected.ema21, "#ff8800"], ["VWAP", `₹${selected.vwap}`, "#00bbff"], ["ATR", selected.atr, "#cc88ff"], ["Day HIGH", `₹${selected.high}`, "#00ff88"], ["Day LOW", `₹${selected.low}`, "#ff5555"], ["PATTERN", selected.pattern.split(" ")[0], "#7a9ab0"], ["SECTOR", selected.sector, "#5a7080"]].map(([l, v, c]) => (
                  <div key={l} style={{ background: "#080e18", borderRadius: "5px", padding: "7px 8px" }}>
                    <div style={{ color: "#2d4060", fontSize: "7px", marginBottom: "2px" }}>{l}</div>
                    <div style={{ color: c, fontSize: "11px", fontWeight: "700", wordBreak: "break-all" }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: isBuy ? "#030e08" : "#0d0306", border: `1px solid ${selected.color}18`, borderRadius: "8px", padding: "14px", marginBottom: "12px" }}>
                <div style={{ color: selected.color, fontSize: "9px", letterSpacing: "2px", marginBottom: "10px" }}>▶ INTRADAY TRADE PLAN — {isBuy ? "LONG (BUY)" : "AVOID / SHORT"}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7px" }}>
                  {[["BUY PRICE (Entry)", `₹${selected.entry}`, "#00bbff"], ["TARGET PRICE", `₹${selected.target}  (+${pctT}%)`, "#00ff88"], ["STOP LOSS", `₹${selected.stopLoss}  (${pctSL}%)`, "#ff4444"], ["RISK : REWARD", `1 : ${rr}`, "#ffd700"], ["QTY TO BUY", `${qty} shares`, "#ffd700"], ["TOTAL INVESTMENT", `₹${parseInt(inv).toLocaleString("en-IN")}`, "#c8d8e0"], ["MAX PROFIT", `₹${parseInt(profit).toLocaleString("en-IN")}`, "#00ff88"], ["MAX LOSS", `₹${parseInt(maxLoss).toLocaleString("en-IN")}`, "#ff5555"]].map(([l, v, c]) => (
                    <div key={l} style={{ background: "#060c16", borderRadius: "5px", padding: "9px 10px" }}>
                      <div style={{ color: "#2d4060", fontSize: "7px", marginBottom: "2px" }}>{l}</div>
                      <div style={{ color: c, fontSize: "14px", fontWeight: "700" }}>{v}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: "12px", padding: "10px 12px", background: "#060c16", borderRadius: "6px", color: "#3a5060", fontSize: "9px", lineHeight: "1.8" }}>
                  {isBuy
                    ? `💡 Enter BUY at ₹${selected.entry}. Set stop-loss at ₹${selected.stopLoss} (${Math.abs(parseFloat(pctSL)).toFixed(1)}% below entry). Target ₹${selected.target} (+${pctT}%). Buy ${qty} shares = ₹${parseInt(inv).toLocaleString("en-IN")} total. ⚠ COMPULSORY EXIT before 3:20 PM IST. Max risk per trade = ₹${parseInt(maxLoss).toLocaleString("en-IN")}.`
                    : `⚠ Signal is BEARISH. AVOID buying. Wait for reversal or skip this stock today. If short-selling: entry ₹${selected.entry}, SL ₹${selected.stopLoss}, target ₹${selected.target}.`}
                </div>
              </div>
              <div style={{ color: "#2d4060", fontSize: "7px", letterSpacing: "1px", marginBottom: "6px" }}>WHY THIS SIGNAL</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                {[...selected.reasons, selected.pattern].map((r, i) => (
                  <span key={i} style={{ background: "#07101a", border: "1px solid #0d1a28", color: "#3a5870", fontSize: "8px", padding: "3px 9px", borderRadius: "10px" }}>{r}</span>
                ))}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

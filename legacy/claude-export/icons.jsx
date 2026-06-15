/* global React */
// Lucide-style line icons for Virtualia Condo. All take {size, strokeWidth, ...rest}.
const h = React.createElement;
const iconBase = (size = 18, sw = 1.8, extra = {}) => ({
  width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', strokeWidth: sw, strokeLinecap: 'round', strokeLinejoin: 'round', ...extra,
});
const I = (paths) => ({ size = 18, strokeWidth = 1.8, ...rest } = {}) =>
  h('svg', { ...iconBase(size, strokeWidth), ...rest }, paths);

const Home = I([h('path',{key:1,d:'M3 12L12 4l9 8'}),h('path',{key:2,d:'M5 10v10h14V10'})]);
const Building = I([h('rect',{key:1,x:4,y:3,width:16,height:18,rx:1.5}),h('path',{key:2,d:'M9 8h.01M15 8h.01M9 12h.01M15 12h.01M9 16h6'})]);
const Building2 = I([h('path',{key:1,d:'M6 22V4a1 1 0 011-1h6a1 1 0 011 1v18'}),h('path',{key:2,d:'M14 9h4a1 1 0 011 1v12'}),h('path',{key:3,d:'M3 22h18M9 7h.01M9 11h.01M9 15h.01'})]);
const HomeUnit = I([h('path',{key:1,d:'M3 11l9-7 9 7'}),h('path',{key:2,d:'M5 9.5V20h14V9.5'}),h('rect',{key:3,x:10,y:14,width:4,height:6})]);
const Wallet = I([h('path',{key:1,d:'M3 7a2 2 0 012-2h13a1 1 0 011 1v2'}),h('path',{key:2,d:'M3 7v10a2 2 0 002 2h14a1 1 0 001-1v-3'}),h('path',{key:3,d:'M21 11h-4a2 2 0 000 4h4a1 1 0 001-1v-2a1 1 0 00-1-1z'})]);
const Coins = I([h('circle',{key:1,cx:8,cy:8,r:5}),h('path',{key:2,d:'M16.7 4.3a5 5 0 010 9.4M11 17.5a5 5 0 009.4 0M11 13a5 5 0 009 3'})]);
const Receipt = I([h('path',{key:1,d:'M5 3v18l2-1.2L9 21l2-1.2L13 21l2-1.2L17 21l2-1.2V3l-2 1.2L15 3l-2 1.2L11 3 9 4.2 7 3z'}),h('path',{key:2,d:'M8 8h8M8 12h8M8 16h5'})]);
const FileCheck = I([h('path',{key:1,d:'M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z'}),h('path',{key:2,d:'M14 3v5h5'}),h('path',{key:3,d:'M9 15l2 2 4-4'})]);
const FileText = I([h('path',{key:1,d:'M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z'}),h('path',{key:2,d:'M14 3v5h5M9 13h6M9 17h4'})]);
const Wrench = I([h('path',{key:1,d:'M14.7 6.3a4 4 0 00-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-2.7 2.7-3-3 2.7-2.7z'})]);
const Droplet = I([h('path',{key:1,d:'M12 3s6 5.7 6 10a6 6 0 01-12 0c0-4.3 6-10 6-10z'})]);
const Waves = I([h('path',{key:1,d:'M2 8c1.5 0 1.5 1.5 3 1.5S6.5 8 8 8s1.5 1.5 3 1.5S12.5 8 14 8s1.5 1.5 3 1.5S18.5 8 20 8s1.5 1.5 2 1.5'}),h('path',{key:2,d:'M2 13c1.5 0 1.5 1.5 3 1.5S6.5 13 8 13s1.5 1.5 3 1.5 1.5-1.5 3-1.5 1.5 1.5 3 1.5 1.5-1.5 3-1.5 1.5 1.5 2 1.5'}),h('path',{key:3,d:'M2 18c1.5 0 1.5 1.5 3 1.5S6.5 18 8 18s1.5 1.5 3 1.5 1.5-1.5 3-1.5 1.5 1.5 3 1.5 1.5-1.5 3-1.5 1.5 1.5 2 1.5'})]);
const CalendarCheck = I([h('rect',{key:1,x:3,y:4,width:18,height:17,rx:2}),h('path',{key:2,d:'M16 2v4M8 2v4M3 10h18M9 16l2 2 4-4'})]);
const Megaphone = I([h('path',{key:1,d:'M3 11l15-5v12L3 13z'}),h('path',{key:2,d:'M11.6 16.8a3 3 0 11-5.8-1.6'})]);
const FolderOpen = I([h('path',{key:1,d:'M4 20a2 2 0 01-2-2V6a2 2 0 012-2h5l2 2h7a2 2 0 012 2v2'}),h('path',{key:2,d:'M2 12h18l-2.5 7a1 1 0 01-1 .7H4a1 1 0 01-1-1z'})]);
const KeyRound = I([h('circle',{key:1,cx:8,cy:8,r:5}),h('path',{key:2,d:'M11.5 11.5L20 20M17 17l2-2M14 14l2-2'})]);
const ScanLine = I([h('path',{key:1,d:'M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2'}),h('path',{key:2,d:'M3 12h18'})]);
const ChartPie = I([h('path',{key:1,d:'M21 15.5A9 9 0 118.5 3'}),h('path',{key:2,d:'M21.2 9A9 9 0 0015 2.8V9z'})]);
const Settings = I([h('circle',{key:1,cx:12,cy:12,r:3}),h('path',{key:2,d:'M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.6 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.6a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09A1.65 1.65 0 0015 4.6a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9c.16.61.59 1.12 1.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z'})]);

const ChevronDown = I([h('polyline',{key:1,points:'6 9 12 15 18 9'})]);
const ChevronUp = I([h('polyline',{key:1,points:'18 15 12 9 6 15'})]);
const ChevronRight = I([h('polyline',{key:1,points:'9 6 15 12 9 18'})]);
const ChevronLeft = I([h('polyline',{key:1,points:'15 6 9 12 15 18'})]);
const Search = I([h('circle',{key:1,cx:11,cy:11,r:7}),h('line',{key:2,x1:21,y1:21,x2:16.65,y2:16.65})]);
const Bell = I([h('path',{key:1,d:'M18 16v-5a6 6 0 10-12 0v5l-2 2v1h16v-1z'}),h('path',{key:2,d:'M10 21a2 2 0 004 0'})]);
const Help = I([h('circle',{key:1,cx:12,cy:12,r:9}),h('path',{key:2,d:'M9.5 9a2.5 2.5 0 015 0c0 1.5-2.5 2-2.5 4M12 17h.01'})]);
const Check = I([h('polyline',{key:1,points:'20 6 9 17 4 12'})]);
const CheckCircle = I([h('path',{key:1,d:'M22 11.1V12a10 10 0 11-5.9-9.1'}),h('polyline',{key:2,points:'22 4 12 14.01 9 11.01'})]);
const Plus = I([h('path',{key:1,d:'M12 5v14M5 12h14'})]);
const Minus = I([h('path',{key:1,d:'M5 12h14'})]);
const ArrowUp = I([h('line',{key:1,x1:12,y1:19,x2:12,y2:5}),h('polyline',{key:2,points:'5 12 12 5 19 12'})]);
const ArrowDown = I([h('line',{key:1,x1:12,y1:5,x2:12,y2:19}),h('polyline',{key:2,points:'19 12 12 19 5 12'})]);
const ArrowRight = I([h('line',{key:1,x1:5,y1:12,x2:19,y2:12}),h('polyline',{key:2,points:'12 5 19 12 12 19'})]);
const TrendingUp = I([h('polyline',{key:1,points:'23 6 13.5 15.5 8.5 10.5 1 18'}),h('polyline',{key:2,points:'17 6 23 6 23 12'})]);
const TrendingDown = I([h('polyline',{key:1,points:'23 18 13.5 8.5 8.5 13.5 1 6'}),h('polyline',{key:2,points:'17 18 23 18 23 12'})]);
const Send = I([h('path',{key:1,d:'M22 2L11 13'}),h('polygon',{key:2,points:'22 2 15 22 11 13 2 9 22 2'})]);
const Sparkles = I([h('path',{key:1,d:'M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z'}),h('path',{key:2,d:'M19 14l.7 2.1L22 17l-2.3.9L19 20l-.7-2.1L16 17l2.3-.9z'}),h('path',{key:3,d:'M5 16l.5 1.5L7 18l-1.5.5L5 20l-.5-1.5L3 18l1.5-.5z'})]);
const Filter = I([h('polygon',{key:1,points:'22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3'})]);
const Download = I([h('path',{key:1,d:'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4'}),h('polyline',{key:2,points:'7 10 12 15 17 10'}),h('line',{key:3,x1:12,y1:15,x2:12,y2:3})]);
const Calendar = I([h('rect',{key:1,x:3,y:4,width:18,height:17,rx:2}),h('line',{key:2,x1:16,y1:2,x2:16,y2:6}),h('line',{key:3,x1:8,y1:2,x2:8,y2:6}),h('line',{key:4,x1:3,y1:10,x2:21,y2:10})]);
const Tag = I([h('path',{key:1,d:'M20.59 13.41L13.42 20.58a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z'}),h('line',{key:2,x1:7,y1:7,x2:7.01,y2:7})]);
const MoreVertical = I([h('circle',{key:1,cx:12,cy:5,r:1}),h('circle',{key:2,cx:12,cy:12,r:1}),h('circle',{key:3,cx:12,cy:19,r:1})]);
const Phone = I([h('path',{key:1,d:'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.7 2.81a2 2 0 01-.45 2.11L8 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.33 1.85.57 2.81.7a2 2 0 011.72 2z'})]);
const Mail = I([h('rect',{key:1,x:3,y:5,width:18,height:14,rx:2}),h('polyline',{key:2,points:'3 7 12 13 21 7'})]);
const X = I([h('line',{key:1,x1:18,y1:6,x2:6,y2:18}),h('line',{key:2,x1:6,y1:6,x2:18,y2:18})]);
const Clock = I([h('circle',{key:1,cx:12,cy:12,r:9}),h('polyline',{key:2,points:'12 7 12 12 16 14'})]);
const Lock = I([h('rect',{key:1,x:3,y:11,width:18,height:11,rx:2}),h('path',{key:2,d:'M7 11V7a5 5 0 0110 0v4'})]);
const Shield = I([h('path',{key:1,d:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'})]);
const ShieldCheck = I([h('path',{key:1,d:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'}),h('polyline',{key:2,points:'9 12 11 14 15 10'})]);
const Eye = I([h('path',{key:1,d:'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'}),h('circle',{key:2,cx:12,cy:12,r:3})]);
const Edit = I([h('path',{key:1,d:'M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7'}),h('path',{key:2,d:'M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4 9.5-9.5z'})]);
const Car = I([h('path',{key:1,d:'M5 11l1.5-4.5A2 2 0 018.4 5h7.2a2 2 0 011.9 1.5L19 11'}),h('path',{key:2,d:'M3 11h18v6h-2v2a1 1 0 01-1 1h-1a1 1 0 01-1-1v-2H7v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2H3z'}),h('circle',{key:3,cx:7,cy:14.5,r:1}),h('circle',{key:4,cx:17,cy:14.5,r:1})]);
const UserCircle = I([h('circle',{key:1,cx:12,cy:12,r:9}),h('circle',{key:2,cx:12,cy:10,r:3}),h('path',{key:3,d:'M6.5 18a6 6 0 0111 0'})]);
const Users = I([h('path',{key:1,d:'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2'}),h('circle',{key:2,cx:9,cy:7,r:4}),h('path',{key:3,d:'M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75'})]);
const AlertTriangle = I([h('path',{key:1,d:'M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z'}),h('line',{key:2,x1:12,y1:9,x2:12,y2:13}),h('line',{key:3,x1:12,y1:17,x2:12.01,y2:17})]);
const Flame = I([h('path',{key:1,d:'M12 2c1 4-3 5-3 9a3 3 0 006 0c0-1.5-1-2.5-1-4 2 1 4 3.5 4 7a6 6 0 01-12 0c0-5 5-7 6-12z'})]);
const Bolt = I([h('polygon',{key:1,points:'13 2 3 14 12 14 11 22 21 10 12 10 13 2'})]);
const Leaf = I([h('path',{key:1,d:'M11 20A7 7 0 014 13c0-6 6-9 16-9 0 8-3 14-9 14z'}),h('path',{key:2,d:'M4 20s2-6 9-9'})]);
const Elevator = I([h('rect',{key:1,x:4,y:3,width:16,height:18,rx:1.5}),h('path',{key:2,d:'M12 3v18M9 8l-1.5 2h3zM15 8l1.5 2h-3z'})]);
const Trash = I([h('path',{key:1,d:'M3 6h18M8 6V4a1 1 0 011-1h6a1 1 0 011 1v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6'})]);
const Dumbbell = I([h('path',{key:1,d:'M6.5 6.5l11 11M21 21l-1-1M3 3l1 1'}),h('path',{key:2,d:'M18 5l1-1 1 1 1 1-1 1M6 19l-1 1-1-1-1-1 1-1'})]);
const Sun = I([h('circle',{key:1,cx:12,cy:12,r:4}),h('path',{key:2,d:'M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4'})]);
const Sofa = I([h('path',{key:1,d:'M3 11V8a2 2 0 012-2h14a2 2 0 012 2v3'}),h('path',{key:2,d:'M3 11a2 2 0 012 2v2h14v-2a2 2 0 012-2 2 2 0 012 2v4H1v-4a2 2 0 012-2z'}),h('path',{key:3,d:'M5 19v2M19 19v2'})]);
const Image = I([h('rect',{key:1,x:3,y:3,width:18,height:18,rx:2}),h('circle',{key:2,cx:8.5,cy:8.5,r:1.5}),h('path',{key:3,d:'M21 15l-5-5L5 21'})]);
const Paperclip = I([h('path',{key:1,d:'M21.44 11.05l-9.19 9.19a6 6 0 11-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66L9.41 17.41a2 2 0 01-2.83-2.83l8.49-8.49'})]);
const Printer = I([h('path',{key:1,d:'M6 9V3h12v6'}),h('path',{key:2,d:'M6 18H4a2 2 0 01-2-2v-3a2 2 0 012-2h16a2 2 0 012 2v3a2 2 0 01-2 2h-2'}),h('rect',{key:3,x:6,y:14,width:12,height:7,rx:1})]);
const Sheet = I([h('rect',{key:1,x:3,y:3,width:18,height:18,rx:2}),h('path',{key:2,d:'M3 9h18M3 15h18M9 3v18M15 3v18'})]);
const Bot = I([h('rect',{key:1,x:4,y:8,width:16,height:11,rx:2.5}),h('path',{key:2,d:'M12 8V4M9 13h.01M15 13h.01'}),h('circle',{key:3,cx:12,cy:4,r:1}),h('path',{key:4,d:'M2 14h2M20 14h2'})]);
const Info = I([h('circle',{key:1,cx:12,cy:12,r:9}),h('path',{key:2,d:'M12 16v-4M12 8h.01'})]);
const Database = I([h('ellipse',{key:1,cx:12,cy:5,rx:9,ry:3}),h('path',{key:2,d:'M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5'}),h('path',{key:3,d:'M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6'})]);
const Layers = I([h('polygon',{key:1,points:'12 2 2 7 12 12 22 7 12 2'}),h('polyline',{key:2,points:'2 17 12 22 22 17'}),h('polyline',{key:3,points:'2 12 12 17 22 12'})]);
const List = I([h('line',{key:1,x1:8,y1:6,x2:21,y2:6}),h('line',{key:2,x1:8,y1:12,x2:21,y2:12}),h('line',{key:3,x1:8,y1:18,x2:21,y2:18}),h('line',{key:4,x1:3,y1:6,x2:3.01,y2:6}),h('line',{key:5,x1:3,y1:12,x2:3.01,y2:12}),h('line',{key:6,x1:3,y1:18,x2:3.01,y2:18})]);
const Grid = I([h('rect',{key:1,x:3,y:3,width:7,height:7,rx:1}),h('rect',{key:2,x:14,y:3,width:7,height:7,rx:1}),h('rect',{key:3,x:14,y:14,width:7,height:7,rx:1}),h('rect',{key:4,x:3,y:14,width:7,height:7,rx:1})]);
const Columns = I([h('rect',{key:1,x:3,y:3,width:18,height:18,rx:2}),h('line',{key:2,x1:9,y1:3,x2:9,y2:21}),h('line',{key:3,x1:15,y1:3,x2:15,y2:21})]);
const LogOut = I([h('path',{key:1,d:'M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4'}),h('polyline',{key:2,points:'16 17 21 12 16 7'}),h('line',{key:3,x1:21,y1:12,x2:9,y2:12})]);
const MapPin = I([h('path',{key:1,d:'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z'}),h('circle',{key:2,cx:12,cy:10,r:3})]);
const Briefcase = I([h('rect',{key:1,x:2,y:7,width:20,height:14,rx:2}),h('path',{key:2,d:'M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16'})]);

window.Icons = {
  Home, Building, Building2, HomeUnit, Wallet, Coins, Receipt, FileCheck, FileText,
  Wrench, Droplet, Waves, CalendarCheck, Megaphone, FolderOpen, KeyRound, ScanLine,
  ChartPie, Settings, ChevronDown, ChevronUp, ChevronRight, ChevronLeft, Search, Bell,
  Help, Check, CheckCircle, Plus, Minus, ArrowUp, ArrowDown, ArrowRight, TrendingUp,
  TrendingDown, Send, Sparkles, Filter, Download, Calendar, Tag, MoreVertical, Phone,
  Mail, X, Clock, Lock, Shield, ShieldCheck, Eye, Edit, Car, UserCircle, Users,
  AlertTriangle, Flame, Bolt, Leaf, Elevator, Trash, Dumbbell, Sun, Sofa, Image,
  Paperclip, Printer, Sheet, Bot, Info, Database, Layers, List, Grid, Columns, LogOut,
  MapPin, Briefcase,
};

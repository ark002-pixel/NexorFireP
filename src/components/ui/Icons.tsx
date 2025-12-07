'use client';

import {
    ClipboardCheck, FileText, AlertTriangle, CheckCircle, Settings, LayoutDashboard,
    Activity, ShieldAlert, Radio, Map,
    Calendar, HeartPulse, UserSquare2,
    Truck, Wrench,
    BarChart3, Search, Filter
} from 'lucide-react';

export const IconClipboardCheck = ({ size }: { size: number }) => <ClipboardCheck size={size} />;
export const IconFileText = ({ size }: { size: number }) => <FileText size={size} />;
export const IconAlertTriangle = ({ size }: { size: number }) => <AlertTriangle size={size} />;
export const IconCheckCircle = ({ size }: { size: number }) => <CheckCircle size={size} />;
export const IconSettings = ({ size, style }: { size: number, style?: React.CSSProperties }) => <Settings size={size} style={style} />;
export const IconLayoutDashboard = ({ size }: { size: number }) => <LayoutDashboard size={size} />;

export const IconActivity = ({ size }: { size: number }) => <Activity size={size} />;
export const IconShieldAlert = ({ size }: { size: number }) => <ShieldAlert size={size} />;
export const IconRadio = ({ size }: { size: number }) => <Radio size={size} />;
export const IconMap = ({ size }: { size: number }) => <Map size={size} />;

export const IconCalendar = ({ size }: { size: number }) => <Calendar size={size} />;
export const IconHeartPulse = ({ size }: { size: number }) => <HeartPulse size={size} />;
export const IconUserSquare2 = ({ size }: { size: number }) => <UserSquare2 size={size} />;
export const IconUser = ({ size }: { size: number }) => <UserSquare2 size={size} />;

export const IconTruck = ({ size }: { size: number }) => <Truck size={size} />;
export const IconWrench = ({ size }: { size: number }) => <Wrench size={size} />;

export const IconBarChart3 = ({ size }: { size: number }) => <BarChart3 size={size} />;
export const IconSearch = ({ size }: { size: number }) => <Search size={size} />;
export const IconFilter = ({ size }: { size: number }) => <Filter size={size} />;

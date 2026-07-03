import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Building2,
  CalendarDays,
  ChartColumn,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  CirclePlus,
  ClipboardCheck,
  Clock,
  FileCheck2,
  FileText,
  Filter,
  FolderOpen,
  IdCard,
  Info,
  Landmark,
  LayoutDashboard,
  ListChecks,
  LockKeyhole,
  LogIn,
  Mail,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Ticket,
  Trash2,
  User,
  type LucideIcon,
} from "lucide-react";

const icons = {
  arrowRight: ArrowRight,
  badgeCheck: BadgeCheck,
  banknote: Banknote,
  building: Building2,
  calendar: CalendarDays,
  chart: ChartColumn,
  checkCircle: CheckCircle2,
  chevronRight: ChevronRight,
  alert: CircleAlert,
  circlePlus: CirclePlus,
  clipboardCheck: ClipboardCheck,
  clock: Clock,
  fileCheck: FileCheck2,
  fileText: FileText,
  filter: Filter,
  folder: FolderOpen,
  idCard: IdCard,
  info: Info,
  landmark: Landmark,
  dashboard: LayoutDashboard,
  listChecks: ListChecks,
  lock: LockKeyhole,
  login: LogIn,
  mail: Mail,
  plus: Plus,
  search: Search,
  settings: Settings,
  shield: ShieldCheck,
  ticket: Ticket,
  trash: Trash2,
  user: User,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

type IconProps = {
  name: IconName;
  label?: string;
  className?: string;
  size?: number;
  strokeWidth?: number;
};

export function Icon({ name, label, className = "", size = 20, strokeWidth = 2 }: IconProps) {
  const LucideIcon = icons[name];

  return <LucideIcon aria-hidden={label ? undefined : true} aria-label={label} className={className} size={size} strokeWidth={strokeWidth} />;
}

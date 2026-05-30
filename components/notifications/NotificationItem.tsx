import { Bell, Car, CheckCircle, XCircle } from 'lucide-react';

type NotificationType = 'booking' | 'confirmed' | 'cancelled' | 'system';

interface NotificationItemProps {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  onRead: (id: number) => void;
}

const iconMap: Record<NotificationType, React.ReactNode> = {
  booking: <Car size={16} className="text-blue-500" />,
  confirmed: <CheckCircle size={16} className="text-green-500" />,
  cancelled: <XCircle size={16} className="text-red-400" />,
  system: <Bell size={16} className="text-gray-400" />,
};

export function NotificationItem({ id, type, title, message, date, isRead, onRead }: NotificationItemProps) {
  return (
    <div
      onClick={() => onRead(id)}
      className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-colors ${
        isRead ? 'bg-white' : 'bg-blue-50'
      } hover:bg-gray-50`}
    >
      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
        {iconMap[type]}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium text-gray-800">{title}</p>
          <span className="text-xs text-gray-400 shrink-0">{date}</span>
        </div>
        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{message}</p>
      </div>
      {!isRead && (
        <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1.5" />
      )}
    </div>
  );
}
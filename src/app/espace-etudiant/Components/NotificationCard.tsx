"use client";

import { Notification } from '../models/etudiant.model';

interface NotificationCardProps {
  notification: Notification;
}

const NotificationCard = ({ notification }: NotificationCardProps) => {
  const getNotificationStyle = (type: string) => {
    switch (type) {
      case 'rapport':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-500',
          icon: '📄',
          iconBg: 'bg-blue-500'
        };
      case 'evaluation':
        return {
          bg: 'bg-green-50',
          border: 'border-green-500',
          icon: '✓',
          iconBg: 'bg-green-500'
        };
      case 'presence':
        return {
          bg: 'bg-orange-50',
          border: 'border-orange-500',
          icon: '⏰',
          iconBg: 'bg-orange-500'
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-500',
          icon: 'ℹ️',
          iconBg: 'bg-gray-500'
        };
    }
  };

  const style = getNotificationStyle(notification.type);

  return (
    <div className={`flex items-start gap-4 p-4 ${style.bg} rounded-lg border-l-4 ${style.border}`}>
      <div className={`flex-shrink-0 w-10 h-10 ${style.iconBg} text-white rounded-full flex items-center justify-center`}>
        {style.icon}
      </div>
      <div className="flex-1">
        <p className="text-gray-700">
          <span className="font-semibold">{notification.titre} :</span> {notification.message}
        </p>
      </div>
    </div>
  );
};

export default NotificationCard;
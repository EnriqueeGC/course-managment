import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/features/auth/context/auth.context';
import { UserPasswordDialog } from '@/features/users/components/user-password-dialog';
import { UserProfileDialog } from '@/features/users/components/user-profile-dialog';
import type { UserMutationResult } from '@/features/users/types';

function getUserInitials(name: string) {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function getColorFromName(name: string) {
  const colors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-amber-500',
    'bg-green-500',
    'bg-teal-500',
    'bg-blue-500',
    'bg-indigo-500',
    'bg-purple-500',
    'bg-pink-500',
  ];

  let hash = 0;

  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
}

export function UserAvatar({ name }: { name: string }) {
  const { user, logout, updateUser } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);

  const handleProfileSuccess = (result: UserMutationResult) => {
    updateUser({
      id: result.user.id,
      name: result.user.name,
      email: result.user.email,
      role: result.user.role,
    });
    setIsProfileOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage alt={name} />
            <AvatarFallback className={`text-white ${getColorFromName(name)}`}>
              {getUserInitials(name)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setIsProfileOpen(true)}>
              Edit Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsPasswordOpen(true)}>
              Change password
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {user && isProfileOpen && (
        <UserProfileDialog
          user={user}
          onClose={() => setIsProfileOpen(false)}
          onSuccess={handleProfileSuccess}
        />
      )}

      {user && isPasswordOpen && (
        <UserPasswordDialog
          user={user}
          onClose={() => setIsPasswordOpen(false)}
          onSuccess={() => setIsPasswordOpen(false)}
        />
      )}
    </>
  );
}

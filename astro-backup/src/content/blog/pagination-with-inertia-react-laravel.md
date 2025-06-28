---
pubDatetime: 2025-01-01T00:00:00Z
modDatetime: 2025-01-01T00:00:00Z
title: Laravel Pagination with Inertia and React + Shadcn UI.
slug: laravel-pagination-inertia-react-shadcn-ui
featured: true
draft: false
tags:
  - laravel
  - pagination
  - inertia
  - react
  - shadcn ui
description: Some simple steps to implement pagination in react with inertia and shadcn ui.
---
![Image 0: Laravel Pagination with Inertia and React + Shadcn UI.](/posts/laravel-pagination-inertia-react-shadcnui.webp)

# Laravel Pagination with Inertia and React + Shadcn UI

For the past few months, I’ve been fully focused on developing my product, Lunch, and I found that there is no React component for Laravel Pagination. Since I am using Shadcn UI, I decided to create the component with a little help.

## Backend Steps

Let's start by making the query to return paginated results.

```php
User::query()
    ->paginate(15)
```

## Frontend Steps

I’m using TypeScript as well, so I’ve created a generic type for the paginated results, which you can add to your **index.d.ts**.

```typescript
export interface PaginatedResponse<T> {
 current_page: number;
 data: T[];
 first_page_url: string;
 from: number;
 last_page: number;
 last_page_url: string;
 links: {
  url: string | null;
  label: string;
  active: boolean;
 }[];
 next_page_url: string | null;
 path: string;
 per_page: number;
 prev_page_url: string | null;
 to: number;
 total: number;
}

```

Now, let's modify the pagination component provided by Shadcn to work with Inertia.js.
Here’s the updated **Pagination.tsx** file:

```tsx
import { ButtonProps, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import * as React from 'react';

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
 <nav
  role="navigation"
  aria-label="pagination"
  className={cn('mx-auto flex w-full justify-center', className)}
  {...props}
 />
);
Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(
 ({ className, ...props }, ref) => (
  <ul
   ref={ref}
   className={cn('flex flex-row items-center gap-1', className)}
   {...props}
  />
 )
);
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(
 ({ className, ...props }, ref) => (
  <li
   ref={ref}
   className={cn('', className)}
   {...props}
  />
 )
);
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
 isActive?: boolean;
} & Pick<ButtonProps, 'size'> &
 Omit<React.ComponentProps<typeof Link>, 'size'>;

const PaginationLink = ({ className, isActive, size = 'icon', ...props }: PaginationLinkProps) => (
 <Link
  aria-current={isActive ? 'page' : undefined}
  className={cn(
   buttonVariants({
    variant: isActive ? 'outline' : 'ghost',
    size
   }),
   className
  )}
  {...props}
 />
);
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({
 className,
 ...props
}: React.ComponentProps<typeof PaginationLink>) => (
 <PaginationLink
  aria-label="Go to previous page"
  size="default"
  className={cn('gap-1 pl-2.5', className)}
  {...props}
 >
  <ChevronLeft className="h-4 w-4" />
  <span>Previous</span>
 </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
 <PaginationLink
  aria-label="Go to next page"
  size="default"
  className={cn('gap-1 pr-2.5', className)}
  {...props}
 >
  <span>Next</span>
  <ChevronRight className="h-4 w-4" />
 </PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
 <span
  aria-hidden
  className={cn('flex h-9 w-9 items-center justify-center', className)}
  {...props}
 >
  <MoreHorizontal className="h-4 w-4" />
  <span className="sr-only">More pages</span>
 </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
 Pagination,
 PaginationContent,
 PaginationEllipsis,
 PaginationItem,
 PaginationLink,
 PaginationNext,
 PaginationPrevious
};


```

Now you can use it anywhere with your table. Here’s an example:

```tsx
const { users } = usePage().props as unknown as PageProps<{
 users: PaginatedResponse<App.Models.User>;
}>;


return (
<>
<Table>
 <TableHeader>
  <TableRow>
   <TableHead className="w-[120px]">Name</TableHead>
   <TableHead className="text-center">Email</TableHead>
   <TableHead className="text-center">Role</TableHead>
   <TableHead className="text-center">Created</TableHead>
  </TableRow>
 </TableHeader>
 <TableBody>
  {users.data?.map((user) => {
   return (
    <TableRow key={user.id}>
     <TableCell className="w-[100px]">
      {user.name}
     </TableCell>

     <TableCell className="text-center">
      {user.email}
     </TableCell>
     <TableCell className="text-center">
      <Badge>{user.role}</Badge>
     </TableCell>
     <TableCell className="text-center">
      <span className="text-sm text-muted-foreground">
       {formatDistanceToNow(
        new Date(user.created_at),
        {
         addSuffix: true
        }
       )}
      </span>
     </TableCell>
    </TableRow>
   );
  })}
 </TableBody>
</Table>
<InertiaPagination paginateItems={users} />
</>)
```

This should make your pagination work without any issues. Make sure you are using Shadcn UI, which comes with the pagination component. With some minor adjustments, if you’re planning to use it with Vue as well, it should work.
Thanks for reading! I hope this guide helps you have a more efficient and enjoyable coding experience. Have a great day!

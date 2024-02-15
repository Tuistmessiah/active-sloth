import * as React from 'react';

import { cn } from 'src/utils/shadcn.utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, readOnly, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
        {
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2': !readOnly,
        },
        className
      )}
      ref={ref}
      readOnly={readOnly}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };

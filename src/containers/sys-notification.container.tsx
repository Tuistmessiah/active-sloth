import { useTriggerEffect } from 'src/hooks/use-trigger.hook';
import { useToast } from 'src/components/ui/use-toast';

export default function SysNotification() {
  const { toast } = useToast();

  useTriggerEffect('trigger-notification', (trigger) => {
    toast({
      title: 'Something went wrong!',
      description: trigger.message,
    });
  });

  return <></>;
}


import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertCircle } from "lucide-react";

interface ProfileValidationModalProps {
  isOpen: boolean;
  missingFields: string[];
}

export const ProfileValidationModal: React.FC<ProfileValidationModalProps> = ({
  isOpen,
  missingFields,
}) => {
  const navigate = useNavigate();

  const handleCompleteProfile = () => {
    navigate("/profile");
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            <AlertDialogTitle>Complete Your Profile</AlertDialogTitle>
          </div>
          <AlertDialogDescription>
            To proceed with checkout, please complete your profile information.
            {missingFields.length > 0 && (
              <ul className="mt-2 list-disc list-inside">
                {missingFields.includes("address") && (
                  <li>Add your delivery address</li>
                )}
                {missingFields.includes("phone") && (
                  <li>Add your phone number</li>
                )}
              </ul>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleCompleteProfile}>
            Complete Profile
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, Eye, EyeOff, ArrowLeft, Shield } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
} from "@/components/ui/dialog";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [tokenError, setTokenError] = useState(false);
  const navigate = useNavigate();

  // Check if we have a valid reset token on load
  useEffect(() => {
    const checkToken = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error || !data.session) {
        setTokenError(true);
        console.error("Invalid or expired token:", error);
      }
    };
    
    checkToken();
  }, []);

  const calculatePasswordStrength = (pass: string) => {
    if (!pass) return 0;
    
    let strength = 0;
    
    // Length check
    if (pass.length >= 8) strength += 20;
    if (pass.length >= 12) strength += 10;
    
    // Character type checks
    if (/[A-Z]/.test(pass)) strength += 20; // Has uppercase
    if (/[a-z]/.test(pass)) strength += 15; // Has lowercase
    if (/[0-9]/.test(pass)) strength += 15; // Has number
    if (/[^A-Za-z0-9]/.test(pass)) strength += 20; // Has special char
    
    return Math.min(100, strength);
  };

  const getPasswordStrengthLabel = (strength: number) => {
    if (strength === 0) return "";
    if (strength < 40) return "Weak";
    if (strength < 70) return "Moderate";
    return "Strong";
  };

  const getPasswordStrengthColor = (strength: number) => {
    if (strength === 0) return "bg-gray-200";
    if (strength < 40) return "bg-red-500";
    if (strength < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(password));
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset error state
    setError("");
    
    // Validation
    if (!password) {
      setError("Please enter a new password");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    
    if (passwordStrength < 40) {
      setError("Please choose a stronger password");
      return;
    }

    setIsLoading(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) throw updateError;

      // Show success modal
      setSuccessDialogOpen(true);
    } catch (err: any) {
      console.error("Password reset error:", err);
      setError(err.message || "Failed to reset password. Please try again.");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to reset password. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/auth");
  };

  // If the token is invalid, show an error message
  if (tokenError) {
    return (
      <Layout>
        <div className="max-w-md mx-auto px-4 py-12">
          <Card className="w-full">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-red-500 font-bold">Invalid Reset Link</CardTitle>
              <CardDescription>
                The password reset link is invalid or has expired.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Reset links are valid for 15 minutes. Please request a new link.
                </AlertDescription>
              </Alert>
              
              <Button 
                onClick={() => navigate("/forgot-password")} 
                className="w-full"
              >
                Request New Reset Link
              </Button>
            </CardContent>
            
            <CardFooter className="flex justify-center border-t pt-4">
              <Button variant="link" onClick={() => navigate("/auth")}>
                Return to login
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto px-4 py-12">
        <Button 
          variant="ghost" 
          className="mb-6 pl-0 text-muted-foreground"
          onClick={handleBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Login
        </Button>

        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
            <CardDescription>
              Create a new secure password for your account.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="w-full pr-10"
                    placeholder="••••••••"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                
                {password && (
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        Password Strength: {getPasswordStrengthLabel(passwordStrength)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {passwordStrength}%
                      </span>
                    </div>
                    <Progress
                      value={passwordStrength}
                      className={`h-1 ${getPasswordStrengthColor(passwordStrength)}`}
                    />
                    
                    <div className="text-xs text-muted-foreground mt-2">
                      <p>Password should include:</p>
                      <ul className="pl-4 list-disc">
                        <li className={password.length >= 8 ? "text-green-500" : ""}>
                          At least 8 characters
                        </li>
                        <li className={/[A-Z]/.test(password) ? "text-green-500" : ""}>
                          Uppercase letters
                        </li>
                        <li className={/[a-z]/.test(password) ? "text-green-500" : ""}>
                          Lowercase letters
                        </li>
                        <li className={/[0-9]/.test(password) ? "text-green-500" : ""}>
                          Numbers
                        </li>
                        <li className={/[^A-Za-z0-9]/.test(password) ? "text-green-500" : ""}>
                          Special characters
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                    className="w-full pr-10"
                    placeholder="••••••••"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                
                {password && confirmPassword && (
                  <div className="mt-1">
                    {password === confirmPassword ? (
                      <span className="text-xs text-green-500 flex items-center">
                        <CheckCircle2 className="h-3 w-3 mr-1" /> Passwords match
                      </span>
                    ) : (
                      <span className="text-xs text-red-500 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" /> Passwords don't match
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Success Dialog */}
        <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                Password Reset Successful
              </DialogTitle>
              <DialogDescription>
                Your password has been reset successfully. You can now log in with your new password.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <Button 
                onClick={() => navigate("/auth")} 
                className="w-full"
              >
                Go to Login
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default ResetPassword;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PasswordResetForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { resetPassword, isLoading, error } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await resetPassword(email);
      toast({
        title: 'Reset link sent',
        description: 'Please check your email for password reset instructions',
      });
      setSubmitted(true);
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Reset failed',
        description: error || 'Unable to send reset instructions',
      });
    }
  };

  if (submitted) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Check Your Email</CardTitle>
          <CardDescription>
            We've sent password reset instructions to {email}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="p-6 bg-muted rounded-lg mb-4">
            <p>Please check your email and follow the instructions to reset your password.</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Didn't receive an email? Check your spam folder or try again.
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link to="/login">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Login
            </Link>
          </Button>
          <Button onClick={() => setSubmitted(false)}>
            Try Again
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Reset Your Password</CardTitle>
        <CardDescription>
          Enter your email address and we'll send you instructions to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@campus.edu"
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              'Send Reset Instructions'
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <Button variant="link" asChild className="mx-auto">
          <Link to="/login">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Login
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PasswordResetForm;

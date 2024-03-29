/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/SdbTHJXCyMb
 */
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {Button} from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useUserSessionStore } from "@/hooks/state/useSession"
import Link from "@/components/ui/link";
export function LoginForm({
  onClose
}:{
  onClose?:()=>void
}) {
  const user = useUserSessionStore((state) => state.user)
  const isLoading = useUserSessionStore((state) => state.isLoading)
  const isLoggedIn = useUserSessionStore((state) => state.isLoggedIn)
  const login = useUserSessionStore((state) => state.login)
  const { register, handleSubmit, watch, formState } = useForm({
    defaultValues: {
      email: "",
      password: "",
    }
  });
  //@ts-ignore
  const onSubmit = async (event) => {
    event.preventDefault();
    await login({
      username: watch("email"),
      password: watch("password"),
    })
    onClose?.()
  }
  return (
        <Tabs className="w-full" defaultValue="signin">
            <TabsList className="grid w-full grid-cols-2 bg-slate-100 rounded-full">
            <TabsTrigger value="signin" className="rounded-full">
              Sign In
            </TabsTrigger>
            <TabsTrigger value="signup"  className="rounded-full">
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent className="p-4" value="signin">
            <form className="space-y-4 w-full" onSubmit={onSubmit}>
              <div className="space-y-2">
                <Input id="signin-email" {...register("email", {required: true})} placeholder="Username/Email"/>
              </div>
              <div className="space-y-2">
                <Input id="signin-password" type="password" {...register("password", {required: true})} placeholder="Password"/>
              </div>
              <div className="flex justify-between">
                <Link href="#" className="text-xs">Forgot Password?</Link>
                <div className="flex">
                {
                  isLoading ? (
                    <Button type="submit" variant={"ghost"} className="ml-auto mr-2" disabled>
                      Loading...
                    </Button>
                  ) : (
                    isLoggedIn ? (
                      <Button type="submit" variant={"ghost"} className="ml-auto mr-2" disabled>
                        Logged in as {user?.username}
                      </Button>
                    ) : (
                      <Button type="submit" variant={"ghost"} className="ml-auto mr-2">
                        Sign In
                      </Button>
                    )
                  )
                }
              </div>
              </div>
            </form>
          </TabsContent>
          <TabsContent className="p-4" value="signup">
            <form className="space-y-4 w-full">
              <Input id="signup-username" required type="text" placeholder="username"/>
              <Input id="signup-email" required type="email" placeholder="email"/>
              <Input id="signup-password" required type="password" placeholder="password"/>
              <Input id="signup-repeat-password" required type="password" placeholder="repeat password"/>
              <div className="flex">
                <Button type="submit" variant={"ghost"} className="ml-auto mr-2">
                    Sign Up
                </Button>
              </div>
              <span className="inline-flex justify-center mt-4 text-xs text-gray-500">
                By clicking Sign Up, you agree to beatsaver.com&apos;s Terms of Service and Privacy Policy.
              </span>
            </form>
          </TabsContent>
        </Tabs>
  )
}

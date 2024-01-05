/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/SdbTHJXCyMb
 */
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button, Text } from "@radix-ui/themes"
import NextLink from "next/link"
import { Link, Theme } from "@radix-ui/themes"
import { FaDiscord } from "react-icons/fa";

export function LoginForm() {
  return (
        <Tabs className="w-full" defaultValue="signin">
            <Theme appearance="light"  asChild >
            <TabsList className="grid w-full grid-cols-2 bg-slate-100 rounded-lg">
            <TabsTrigger value="signin">
              Sign In
            </TabsTrigger>
            <TabsTrigger value="signup">
              Sign Up
            </TabsTrigger>
          </TabsList>
            </Theme>

          <TabsContent className="p-4" value="signin">
            <form className="space-y-4 w-full">
              <div className="space-y-2">
                <Label htmlFor="signin-email">Email</Label>
                <Input id="signin-email" required type="email" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                <Label htmlFor="signin-password">Password</Label>
                <Text size={"2"}>
                    <NextLink href="#">
                    Forgot Password?
                    </NextLink>                
                </Text>
                </div>
                <Input id="signin-password" required type="password" />
              </div>
                <div className="flex">
                    <Button type="submit" variant={"soft"} className="ml-auto mr-2">
                        Sign In
                    </Button>
                </div>
              <div className="flex justify-center mt-4 items-center">
                <FaDiscord className="w-6 h-6" />
              </div>
              <div className="flex justify-center mt-4">

              </div>
            </form>
          </TabsContent>
          <TabsContent className="p-4" value="signup">
            <form className="space-y-4 w-full">
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input id="signup-email" required type="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-username">Username</Label>
                <Input id="signup-username" required type="text" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input id="signup-password" required type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-repeat-password">Repeat Password</Label>
                <Input id="signup-repeat-password" required type="password" />
              </div>
              <div className="flex">
                <Button type="submit" variant={"soft"} className="ml-auto mr-2">
                    Sign Up
                </Button>
              </div>

              <div className="flex justify-center mt-4 text-sm text-gray-500">
                By clicking Register, you agree to beatsaver.com&apos;s
                <Link className="text-blue-500" href="#">
                  Terms of Service
                </Link>
                .{"\n                          "}
              </div>
            </form>
          </TabsContent>
        </Tabs>
  )
}

"use client";
import {
  Button,
  Container,
  DropdownMenu,
  Flex,
  Heading,
  Link,
} from "@radix-ui/themes";
import NavLink from "next/link";
import { useSession, signOut } from "next-auth/react";
import { CaretDownIcon } from "@radix-ui/react-icons";
const Navbar = () => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <nav className="bg-zinc-950 py-4">
      <Container>
        <Flex justify={"between"} align={"center"}>
          <NavLink href={"/"} passHref>
            <Heading>RadixNext</Heading>
          </NavLink>
          <ul className="flex gap-x-4 items-center">
            {!session && (
              <>
                <li>
                  <Link asChild>
                    <NavLink href={"/auth/login"} passHref>
                      Login
                    </NavLink>
                  </Link>
                </li>
                <li>
                  <Link asChild>
                    <NavLink href={"/auth/register"} passHref>
                      Register
                    </NavLink>
                  </Link>
                </li>
              </>
            )}
            {session && (
              <>
                <li>
                  <Link asChild>
                    <NavLink href={"/dashboard"} passHref>
                      Dashboard
                    </NavLink>
                  </Link>
                </li>
                <li>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                      <Button variant="soft">
                        {session?.user?.name}
                        <CaretDownIcon />
                      </Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                      <DropdownMenu.Item>My profile</DropdownMenu.Item>

                      <DropdownMenu.Separator />

                      <DropdownMenu.Item>Settings</DropdownMenu.Item>
                      <DropdownMenu.Separator />
                      <DropdownMenu.Item color="red" onClick={() => signOut()}>
                        Logout
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                </li>
              </>
            )}
          </ul>
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;

import Image from "next/image";
import { Slash } from "lucide-react";
import { ProfileButton } from "./profile-button";
import { OrganizationSwitcher } from "./organization-switcher";

export function Header() {
    return (
        <div className="mx-auto flex max-w-[1200px] items-center justify-between">
            <div className="flex items-center gap-3">
                {/* <Image src={} className="size-6 dark:invert" alt="Cbs"/> */}
                <span>
                    Logo..
                </span>

                <Slash className="size-3 -rotate-45 text-border"/>

                <OrganizationSwitcher />
            </div>

            <div className="flex items-center gap-4">
                <ProfileButton />
            </div>
        </div>
    )
}
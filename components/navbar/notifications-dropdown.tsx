import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  NavbarItem,
} from "@nextui-org/react";
import { NotificationIcon } from "../icons/navbar/notificationicon";

export const NotificationsDropdown = () => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <NavbarItem>
          <NotificationIcon />
        </NavbarItem>
      </DropdownTrigger>
      <DropdownMenu className="w-80" aria-label="Avatar Actions">
        <DropdownSection title="Notificações">
          <DropdownItem
            classNames={{
              base: "py-2",
              title: "text-base font-semibold",
            }}
            key="1"
            description="Aqui você pode acompanhar as denuncias e reclamacões."
          >
            📣 Seja bem-vindo ao dashboard!
          </DropdownItem>
          <DropdownItem
            key="2"
            classNames={{
              base: "py-2 w-auto",
              title: "text-base font-semibold w-auto",
            }}
            description="Hora de por a mão na massa."
          >
            🚀 Desfrute das tecnologias que o <br /> Procon SR oferece!
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

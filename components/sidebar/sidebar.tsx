import { usePathname } from "next/navigation";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { CustomersIcon } from "../icons/sidebar/customers-icon";
import { DevIcon } from "../icons/sidebar/dev-icon";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { useSidebarContext } from "../layout/layout-context";
import { CompaniesDropdown } from "./companies-dropdown";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { Sidebar } from "./sidebar.styles";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <CompaniesDropdown />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Início"
              icon={<HomeIcon />}
              isActive={pathname === "/"}
              href="/"
            />
            <SidebarMenu title="Menu">
              <SidebarItem
                isActive={pathname === "/accounts"}
                title="Reclamações"
                icon={<CustomersIcon />}
                href="accounts"
              />
              <SidebarItem
                isActive={pathname === "/denuncias"}
                title="Denúncias"
                icon={<AccountsIcon />}
                href="denuncias"
              />
              <SidebarItem
                isActive={pathname === "/posts"}
                title="Postagens"
                icon={<DevIcon />}
                href="posts"
              />
              {/* <CollapseItems
                icon={<BalanceIcon />}
                items={["Banks Accounts", "Credit Cards", "Loans"]}
                title="Balances"
              /> */}
            </SidebarMenu>
          </div>
        </div>
      </div>
    </aside>
  );
};

import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import { useStyles } from "./styles";

type NavProps = {
  readonly username: string;
  readonly networkStatus: string;
};

const Nav = ({ username, networkStatus }: NavProps) => {
  const { navContainer } = useStyles();

  return (
    <Menu className={navContainer}>
      <Menu.Item header>{`Welcome ${username}!`}</Menu.Item>
      <Menu.Item header>{`ONLINE: ${networkStatus}`}</Menu.Item>
      <Menu.Item>
        <Link to="/">DataStore</Link>
      </Menu.Item>
      <Menu.Item>
        <AmplifySignOut />
      </Menu.Item>
    </Menu>
  );
};

export default Nav;

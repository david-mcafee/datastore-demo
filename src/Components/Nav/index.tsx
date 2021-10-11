import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import { useStyles } from "./styles";
import { DataStore } from "aws-amplify";

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
        <AmplifySignOut
          handleAuthStateChange={() => {
            // https://docs.amplify.aws/lib/datastore/other-methods/q/platform/js/#clear
            // If your app is has authentication implemented, it is recommended to call
            // DataStore.clear() on signin/signout to remove any user-specific data. This
            // method is often important to use for shared device scenarios or where you
            // need to purge the local on-device storage of records for security/privacy
            // concerns.
            DataStore.clear();
          }}
        />
      </Menu.Item>
    </Menu>
  );
};

export default Nav;

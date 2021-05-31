// @flow
import React, { useEffect } from 'react';
import useSound from 'use-sound';
import { connect } from 'react-redux';
import { setTitlebarProps } from 'src/actions/titlebar';
import { DesktopTitlebar } from 'src/components/titlebar';
import { PrimaryButton } from 'src/components/button';
import UsersSearch from '../components/usersSearch';
import SelectedUserPill from '../components/selectedUserPill';
import { SelectedPillsWrapper } from '../style';
import type { UserInfoType } from 'shared/graphql/fragments/user/userInfo';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

type Props = {
  usersForMessage: Array<UserInfoType>,
  setUsersForMessage: Function,
  setActiveStep: Function,
  dispatch: Function,
};

const Search = (props: Props) => {
  const {
    usersForMessage,
    setUsersForMessage,
    setActiveStep,
    dispatch,
  } = props;

  const [clickSound] = useSound('/sounds/click.mp3', { volume: 0.25 });

  const toWrite = () => {
    clickSound();
    return setActiveStep('write');
  };

  useEffect(() => {
    dispatch(
      setTitlebarProps({
        title: 'New message',
        leftAction: 'view-back',
        rightAction: (
          <PrimaryButton
            size={'small'}
            disabled={!usersForMessage || usersForMessage.length === 0}
            onClick={toWrite}
          >
            <ChevronRightIcon />
          </PrimaryButton>
        ),
      })
    );
  });

  return (
    <React.Fragment>
      <DesktopTitlebar
        title={'New message'}
        rightAction={
          <PrimaryButton
            size={'small'}
            disabled={!usersForMessage || usersForMessage.length === 0}
            onClick={toWrite}
          >
            <ChevronRightIcon />
          </PrimaryButton>
        }
      />
      {usersForMessage && usersForMessage.length > 0 && (
        <SelectedPillsWrapper>
          {usersForMessage.map(
            user =>
              user && <SelectedUserPill key={user.id} user={user} {...props} />
          )}
        </SelectedPillsWrapper>
      )}
      <UsersSearch
        usersForMessage={usersForMessage}
        setUsersForMessage={setUsersForMessage}
      />
    </React.Fragment>
  );
};

export default connect()(Search);

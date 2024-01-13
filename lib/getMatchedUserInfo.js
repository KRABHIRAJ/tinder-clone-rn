const getMatchedUserInfo = (matchedUsers, loggedInUser) => {
  const usersMatched = { ...matchedUsers };
  delete usersMatched[loggedInUser.uid];
  const [id, user] = Object.entries(usersMatched).flat();
  return { id, ...user };
};

export default getMatchedUserInfo;

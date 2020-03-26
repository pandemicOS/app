import { GeneralModel, UserModel } from '../modules/models';
import { IRootState } from '../modules/state-mgmt/rootState';
import { authState } from '../modules/state-mgmt/auth';
import { userState } from '../modules/state-mgmt/user';

export const getPaginationOf = (entity: any): GeneralModel.IPagination<any> => ({
  count: 1,
  page: 1,
  limit: 1,
  totalPages: 1,
  docs: [entity]
});

export const getUser_1 = (): UserModel.IUser => ({
  _id: '9164e4c4-6521-47bb-97fd-c75ac02b2cf5',
  email: 'dgeslin@opyacare.com',
  name: 'name',
  firstname: 'first-mame ',
  lastname: 'last-name',
  nickname: 'nickname',
  avatar: 'https://lh4.googleusercontent.com/-WUY2PDwnKZk/AAAAAAAAAAI/AAAAAAAAAAc/1UMlOKImKRA/photo.jpg',
  picture: 'https://s.gravatar.com/avatar/8e5ef526703b1e38f75cba07ec2c3604?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fdg.png',
  gender: null,
  location: 'sf',
  role: 'general',
  lastOnline: '2018-08-27',
  forcedStatus: UserModel.ForcedStatus.AVAILABLE,
  status: UserModel.Status.ONLINE,
  createdAt: '2018-05-21',
  updatedAt: '2018-08-27'
});

export const getLoginResponse = (): GeneralModel.ILoginResponse => ({
  ...getUser_1(),
  access_token: 'i-am-an-access-token'
});

export const getInitialState = (): IRootState => ({
  auth: { ...authState.initialState },
  user: { ...userState.initialState }
});

export const getState = (): IRootState => ({
  auth: { currentUserId: getUser_1()._id, isLoading: false, hasError: false },
  user: { userMap: { [getUser_1()._id]: getUser_1() } }
});

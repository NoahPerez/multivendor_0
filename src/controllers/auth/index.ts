import { api, apiWp } from '../../api';

export const checkUserEmailPassword = async (email = '', password = '') => {
  console.log({ email });
  console.log({ password });
  try {
    const { data } = await apiWp.auth({
      username: email,
      password,
    });

    if (!data.token) {
      return null;
    }
    //token de valdiacion admin
    const { token } = (await apiWp.token()) as any;
    console.log({ email });
    //listar usuario con el email(token necesario para permisos como admin)
    const { data: userWp } = await apiWp.get('users', {
      params: {
        context: 'edit',
        search: email,
      },
      token,
    });

    let role = 'customer';
    if (!userWp[0]?.id) {
      return null;
    }
    if (userWp[0].capabilities?.administrator) {
      role = 'admin';
    }

    data.id = userWp[0].id;
    (data.email = email.toLocaleLowerCase()), (data.role = role);
    data.name = userWp[0].first_name;
    return data;
  } catch (error) {
    console.log(error);
  }
};

//Esta funcion crea o verifica el usuario de OAuth
export const oAuthToDbUser = async (oAuthEmail: string, oAuthName: string) => {
  try {
    const { status, message, token } = (await apiWp.token()) as any;

    if (status !== 200) {
      throw message;
    }

    const { data: user } = await apiWp.get('users', {
      token,
      params: {
        search: oAuthEmail,
        context: 'edit',
      },
    });
    let role = 'customer';

    if (user.length > 0) {
      console.log('user');
      const {
        id,
        name,
        username,
        email,
        capabilities: { administrator },
      } = user[0];
      if (administrator) {
        role = 'admin';
      }
      return { id, name, username, email, role };
    }

    const { data: newUser } = await api.post('customers', {
      email: oAuthEmail,
      password: '@',
      username: oAuthEmail,
      first_name: oAuthName,
    });

    const { id, first_name, email, username } = newUser;
    return { id, first_name, email, username, role };
  } catch (error) {
    console.log(error);
  }
};

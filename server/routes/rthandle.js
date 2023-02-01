import Express from 'express';
import { smodel, cmodel } from '../models/mlogin.js';
const router = Express.Router();
const getUserDetails = async (userEmail) => {
  try {
    return await smodel.find({ email: userEmail });
  } catch (err) {
    console.log('Error while Finding user Details', err);
  }
  return [];
};

const getContacts = async (query) => {
  console.log('searching for query ', query);
  try {
    return await cmodel.find(query);
  } catch (err) {
    console.log('Error while Finding contact Details', err);
  }
  return [];
};
router
  .route('/login')
  .get((req, res) => {
    res.send('Hi Req from /user/Login');
  })
  .post(async (req, res) => {
    let authenticatUser = false;
    let message;
    console.log('login REQ for ', req.body);
    const email = req.body.email;
    try {
      const user = await getUserDetails(email);
      console.log('user found', user);
      if (user.length !== 1) {
        message = `${email} doesn't exist !, Signup to Create a a Account `;
        console.log(message);
      } else if (
        user[0].email !== email ||
        user[0].password !== req.body.password ||
        user[0].category !== req.body.category
      ) {
        message = `Email/ Password didn't match`;
        console.log(message);
      } else {
        message = 'SuccessFul Login';
        console.log(message);
        authenticatUser = true;
      }
    } catch (err) {
      console.log('Error while Fetching data from DataBase', err);
    }
    res.json({
      auth: authenticatUser,
      message: message,
      data: await getContacts({}),
    });
    // res.send(req.body);
  });

router
  .route('/signup')
  .get((req, res) => {
    res.send('Hi from /user/signup');
  })
  .post(async (req, res) => {
    console.log('Rquest to SERVER to Signup');
    const userEmail = req.body.email;

    //if email already exits error login
    try {
      // console.log('seraching for', userEmail);
      const user = await getUserDetails(userEmail);
      // console.log(user);
      if (user.length > 0) {
        console.log(`${userEmail} has already an account`, user);
        res.send(req.body);
      } else {
        const user_inst = new smodel({
          firstName: req.body.fname,
          middleName: req.body.mname,
          lastName: req.body.lname,
          email: userEmail,
          password: req.body.password,
          category: req.body.category,
        });
        console.log('Welcome', user_inst);
        user_inst.save((err) => {
          if (err) return handleError(err);
          console.log(`User ${user_inst.email} saved to DB`);
        });
        res.send(req.body);
      }
    } catch (err) {
      console.log('error while Searching for Signup', err);
    }
  });

router
  .route('/resetPass')
  .get((req, res) => {
    res.send('Hi from /user/resetPass');
  })
  .post((req, res) => {
    res.send('Hi from /user/resetPass');
  });

router.route('/add').post(async (req, res) => {
  const new_cont = {
    name: req.body.name,
    place: req.body.place,
    invtDate: req.body.invtDate,
  };
  let message;
  try {
    const contacts = await getContacts({ name: new_cont.name });
    let present = false;
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].place === new_cont.place) {
        present = true;
        break;
      }
    }
    if (present) {
      message = `You have already submitted your details`;
    } else {
      console.log(`Saving ${new_cont.name} to cmodel DB`);
      new cmodel(new_cont).save((err) => {
        if (err) return handleError(err);
        console.log('Contact saved to DB');
      });
      message = `Thanks! ${new_cont.name} for coming on ${new_cont.invtDate}`;
    }
  } catch (err) {
    console.log('Error Adding contact details', err);
  }

  res.json({
    message: message,
  });
});

router.route('/contacts').get(async (req, res) => {
  console.log('SERVER Finding Cont Details');
  const alcont = await getContacts({});
  // console.log('ALL DET', alcont);
  res.json({ data: alcont });
});

router
  .route('/reqsent')
  .get((req, res) => {
    res.send('Hi from /user/reqsent');
  })
  .post((req, res) => {
    res.send('Hi from /user/reqsent');
  });

router
  .route('/reqaccept')
  .get((req, res) => {
    res.send('Hi from /user/reqaccept');
  })
  .post((req, res) => {
    res.send('Hi from /user/reqaccept, POST');
    console.log(req.body);
  });

router
  .route('/reqpending')
  .get((req, res) => {
    res.send('Hi from /user/reqpending');
  })
  .post((req, res) => {
    res.send('Hi from /user/reqpending');
  });

export default router;

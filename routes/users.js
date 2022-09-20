import express from 'express';
import { createUser , getUsers, getUser, deleteUser, updateUser } from '../controllers/users.js';


const router = express.Router();


router.get('/', getUsers);

router.post('/', createUser );

//post միջոցով -տվյալներ ենք ուղարկում դեպի սերվեր/անունը, ազգանունը, տարիքը/
//հաճախորդից ուղարկվում է սերվեր, որ օգտագործողն ստեղծվի


// /users/2 => req.params {id: 2}
router.get('/:id', getUser );

router.delete('/:id', deleteUser);

router.patch('/:id', updateUser);

export default router;
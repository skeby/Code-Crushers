import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Student from '../Models/StudentModel.js';
import dotenv from 'dotenv';
import {generatePassword} from '../Utilities/PasswordGeneration.js'
import {sendEmail} from '../Utilities/Email.js';

dotenv.config();
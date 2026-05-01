import { response } from 'express';
import { pool } from '../../db/pool'
import { createUserParams, createUserRes, logisUserRes, userDataType } from '../../shared/types/user'
import { compare, hash } from 'bcrypt'

export const createUser = async (
  params: createUserParams
): Promise<createUserRes> => {
  try {
    const hashedPwd = await hash(params.password, 10);

    const query = `
      INSERT INTO users (username, email, password_hash, rating, profile_img)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id;
    `;

    const res = await pool.query(query, [
      params.username,
      params.email,
      hashedPwd,
      params.rating || 1200,
      params.profile_img|| null,
    ]);

    return {
      success: true,
      userId: res.rows[0].id,
    };

  } catch (error: any) {
    if (error.code === '23505') {
      return {
        success: false,
        msg: "User already exists",
      };
    }

    console.error("error in creating user in db =>\n ** \n"+error+"\n **");

    return {
      success: false,
      msg: "error while creating user",
    };
  }
};

export const loginUser =async(email:string, pwd: string):Promise<logisUserRes>=>{
    //get existing user
    const query =`
    select * from users
    where email = $1
    `
    try {
        const res = await pool.query(query , [email]);
    if(res.rowCount == 0){
        return{
            success:false,
        }
    }
        const hashedPwd = res.rows[0].password_hash;
        const passwordDoesMatch = await  compare(pwd,hashedPwd);
        if(passwordDoesMatch){
            return{
                success:true,
                userId:res.rows[0].id
            }
        }else{
            return{
                success:false,
                msg:"incorrect password"
            }
        }
    } catch (error) {
        console.error("error in retriveing user from db =>\n ** \n"+error+"\n **");
        return{
            success:false,
            msg:"error"
        }
    }
}

export const getUserData = async(userId:string):Promise<userDataType|null>=>{
  const query = `
    select username , email , rating , profile_img 
    from users where id = $1
  `
  try {
    const res = await pool.query(query,[userId]);
    let username = res.rows[0].username;
    let email = res.rows[0].email;
    let rating = res.rows[0].rating;
    let profile_img = res.rows[0].profile_img;
    return{
      username,
      email,
      rating,
      profile_url:profile_img
    }
  } catch (error) {
     console.error("error in retriveing user from db =>\n ** \n"+error+"\n **");
     return null;
  }
}
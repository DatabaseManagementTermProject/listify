/*
    db.js

    Set up connection to Supabase
*/ 

import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config( { path : '.env' } );

const supabaseUrl = 'https://hojmksndyvgqfillkgok.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;

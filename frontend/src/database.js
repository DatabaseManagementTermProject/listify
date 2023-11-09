/* 

    create-react-app does not allow imports outside of /src
    directory. this file establishes a database connection to
    utilize functions from the supabase API in registration and
    login functionality.

*/

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseApiKey = process.env.REACT_APP_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseApiKey);
import { createBrowserRouter } from "react-router-dom"
import Login from "../pages/auth/Login"
import { Home } from "../pages/public/Home"
import Auth from "../middleware/Auth"
import { DetailProduct } from "../pages/public/DetailProduct"
import { Receipt } from "../pages/public/Receipt"
import Admin from "../pages/private/Admin"
import Peminjaman from "../pages/private/Peminjaman"
import Form from "../pages/private/Form"
import FormEdit from "../pages/private/FormEdit"
import FormCreateAdmin from "../pages/private/FormTambahAdmin"
import FormUpdateAdmin from "../pages/private/FormUpdateAdmin"

const router = createBrowserRouter([
    {
        path : '/auth',
        element : <Auth auth={false}> <Login/> </Auth>
    },
    {
        path : '/',
        element : <Auth auth={true}> <Home/> </Auth>
    },
    {
        path : '/detail/:id',
        element : <Auth auth={true}> <DetailProduct/> </Auth>
    },
    {
        path : '/transaksi-pending',
        element : <Auth auth={true}> <Receipt/> </Auth>
    },
    {
        path : '/admin',
        element : <Auth auth={true}> <Admin/> </Auth>
    },
    {
        path : '/peminjaman',
        element : <Auth auth={true}> <Peminjaman/> </Auth>
    },
    {
        path : '/tambah/:record',
        element : <Auth auth={true}> <Form/> </Auth>
    },
    {
        path : '/alat/:id',
        element : <Auth auth={true}> <FormEdit/> </Auth>
    },
    {
        path : '/admin/add',
        element : <Auth auth={true}> <FormCreateAdmin/> </Auth>
    },
    {
        path : '/admin/update/:id',
        element : <Auth auth={true}> <FormUpdateAdmin/> </Auth>
    },
])

export default router
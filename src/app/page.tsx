import styles from '@/app/app.module.scss';
import { Header } from '@/components/Header/Header';
import { CreatePost } from '@/components/CreatePost/CreatePost';
import { TextArea } from '@/components/ui/TextArea/TextArea';
import { FileInput } from '@/components/ui/FileInput/FileInput';

export default function Page() {
    return (
        <>
            <Header />
            <CreatePost />
        </>
    );

}
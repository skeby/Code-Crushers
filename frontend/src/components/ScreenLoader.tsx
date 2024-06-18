import { AnimatePresence, motion } from "framer-motion";
import { Loader } from "lucide-react";

interface Props {
  loading: boolean;
}

const ScreenLoader = ({ loading }: Props) => {
  return (
    <AnimatePresence>
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`fixed left-0 top-0 h-screen w-full !bg-background z-[999] flex cursor-progress items-center justify-center`}
        >
          <Loader className="animate-spin text-primary" />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default ScreenLoader;

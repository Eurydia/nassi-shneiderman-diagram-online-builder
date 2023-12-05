import {
	FC,
	useCallback,
	useEffect,
	useState,
	Fragment,
} from "react";
import {
	Box,
	Button,
	Collapse,
	Grid,
	Typography,
	useTheme,
	Snackbar,
	Stack,
	IconButton,
	Tooltip,
} from "@mui/material";
import {
	LinkRounded,
	FileDownloadRounded,
	UnfoldLessRounded,
	UnfoldMoreRounded,
} from "@mui/icons-material";

import { toSvg } from "html-to-image";
import { saveAs } from "file-saver";

import {
	lexerGetAllTokens,
	lexerInit,
} from "ast/lexer";
import {
	ASTNode,
	parserGetAllNodes,
	parserInit,
} from "ast/parser";
import { StructogramEditor } from "components/StructogramEditor";
import { StructogramRenderer } from "components/StructogramRenderer";

const copyURLToClipboard = (
	content: string,
): void => {
	const url = new URL(window.location.href);
	url.searchParams.set("content", content);
	url.searchParams.set("preview", "true");

	navigator.clipboard.writeText(url.toString());
};

export const PageHome: FC = () => {
	const theme = useTheme();

	const [editorOpen, setEditorOpen] =
		useState<boolean>(() => {
			const url = new URL(window.location.href);
			const previewParam =
				url.searchParams.get("preview");
			if (previewParam !== null) {
				return previewParam !== "true";
			}

			return true;
		});
	const [snackbarURLOpen, setSnackbarURLOpen] =
		useState<boolean>(false);
	const [
		snackbarDownloadOpen,
		setSnackbarDownloadOpen,
	] = useState<boolean>(false);
	const [nodes, setNodes] = useState<ASTNode[]>(
		[],
	);
	const [content, setContent] = useState(() => {
		if (window.location.search !== "") {
			const url = new URL(window.location.href);
			const contentParam =
				url.searchParams.get("content");
			if (contentParam !== null) {
				localStorage.setItem(
					"content",
					contentParam,
				);
				return contentParam;
			}
		}

		const content =
			window.localStorage.getItem("content");
		if (content !== null) {
			return content;
		}
		return "";
	});

	const onTextChange = useCallback(
		(v: string) => {
			setContent(v);
			window.localStorage.setItem("content", v);
		},
		[],
	);

	const onImageSave = useCallback(async () => {
		const node = document.getElementById(
			"structogram-preview-region",
		);

		if (node === null) {
			return;
		}

		toSvg(node).then((blob) => {
			if (blob === null) {
				return;
			}

			if (window.saveAs) {
				window.saveAs(blob, "structogram");
			} else {
				saveAs(blob, "structogram");
			}
		});

		setSnackbarDownloadOpen(true);
	}, []);

	const onCopyLink = useCallback(() => {
		copyURLToClipboard(content);
		setSnackbarURLOpen(true);
	}, [content]);

	useEffect(() => {
		const nodes: ASTNode[] = parserGetAllNodes(
			parserInit(
				lexerGetAllTokens(lexerInit(content)),
			),
		);
		setNodes(nodes);
	}, [content]);

	return (
		<Fragment>
			<Box
				padding={4}
				component="section"
			>
				<Typography
					borderRadius={4}
					bgcolor={
						theme.palette.background.default
					}
					padding={2}
					fontWeight={700}
					component="h1"
					variant="h4"
					marginBottom={2}
				>
					<a
						target="_blank"
						hrefLang="en"
						href="https://en.wikipedia.org/wiki/Nassi%E2%80%93Shneiderman_diagram"
					>
						Structogram
					</a>{" "}
					builder
				</Typography>
				<Grid
					container
					spacing={2}
				>
					<Grid
						item
						xs={12}
					>
						<Box
							component="section"
							borderRadius={4}
							padding={2}
							bgcolor={
								theme.palette.background.paper
							}
						>
							<Typography
								component="h2"
								fontWeight={700}
								variant="h5"
								alignItems="center"
							>
								<Tooltip
									title={
										editorOpen
											? "Collapse editor"
											: "Expand editor"
									}
								>
									<IconButton
										onClick={() =>
											setEditorOpen(!editorOpen)
										}
									>
										{editorOpen ? (
											<UnfoldLessRounded />
										) : (
											<UnfoldMoreRounded />
										)}
									</IconButton>
								</Tooltip>
								Editor
							</Typography>

							<Collapse
								in={editorOpen}
								orientation="vertical"
							>
								<Typography
									paragraph
									component="p"
								>
									Visit the{" "}
									<a
										href="https://github.com/Eurydia/nassi-shneiderman-diagram-builder-online"
										hrefLang="en"
										target="_blank"
									>
										project GitHub repository
									</a>{" "}
									for more information about the
									syntax.
								</Typography>
								<StructogramEditor
									value={content}
									onValueChange={onTextChange}
								/>
							</Collapse>
						</Box>
					</Grid>
					<Grid
						item
						xs={12}
					>
						<Box
							component="section"
							borderRadius={4}
							padding={2}
							bgcolor={
								theme.palette.background.paper
							}
						>
							<Typography
								component="h2"
								fontWeight={700}
								variant="h5"
							>
								Preview
							</Typography>

							<div id="structogram-preview-region">
								<StructogramRenderer
									nodes={nodes}
								/>
							</div>
							<Stack
								spacing={2}
								direction={{
									xs: "column",
									sm: "row",
								}}
							>
								<Button
									fullWidth
									disableElevation
									variant="contained"
									onClick={onCopyLink}
									startIcon={<LinkRounded />}
								>
									Share URL
								</Button>
								<Button
									fullWidth
									disableElevation
									variant="contained"
									onClick={onImageSave}
									startIcon={
										<FileDownloadRounded />
									}
								>
									Save as SVG
								</Button>
							</Stack>
						</Box>
					</Grid>
				</Grid>
			</Box>
			<Snackbar
				open={snackbarURLOpen}
				autoHideDuration={3000}
				onClose={() => setSnackbarURLOpen(false)}
				message="Link copied to clipboard"
			/>
			<Snackbar
				open={snackbarDownloadOpen}
				autoHideDuration={3000}
				onClose={() =>
					setSnackbarDownloadOpen(false)
				}
				message="Saved structogram"
			/>
		</Fragment>
	);
};
